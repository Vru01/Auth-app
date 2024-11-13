const express = require('express');
const multer = require('multer');
const mysql = require('mysql2/promise');
const fs = require('fs-extra');
const path = require('path');

const app = express();

const UPLOAD_DIR = path.join(__dirname, 'uploads');
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'application/pdf', 'text/plain'];

fs.ensureDirSync(UPLOAD_DIR);

const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '22510039',
    database: 'file_upload_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function initializeDatabase() {
    try {
        const connection = await pool.getConnection();
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS files (
                id INT AUTO_INCREMENT PRIMARY KEY,
                original_name VARCHAR(255) NOT NULL,
                current_version INT NOT NULL DEFAULT 1,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS file_versions (
                id INT AUTO_INCREMENT PRIMARY KEY,
                file_id INT NOT NULL,
                version_number INT NOT NULL,
                file_path VARCHAR(255) NOT NULL,
                mime_type VARCHAR(100) NOT NULL,
                size BIGINT NOT NULL,
                uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (file_id) REFERENCES files(id),
                UNIQUE KEY unique_file_version (file_id, version_number)
            )
        `);
        connection.release();
        console.log('Database initialized successfully');
    } catch (err) {
        console.error('Database initialization error:', err);
        process.exit(1);
    }
}

initializeDatabase();

const storage = multer.diskStorage({
    destination: (_, file, cb) => {
        cb(null, UPLOAD_DIR);
    },
    filename: async (_, file, cb) => {
        try {
            const fileId = await getFileId(file.originalname);
            const version = await getNextVersion(fileId);
            const ext = path.extname(file.originalname);
            const baseName = path.basename(file.originalname, ext);
            const newFileName = `${baseName}_v${version}${ext}`;
            cb(null, newFileName);
        } catch (err) {
            cb(err);
        }
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: MAX_FILE_SIZE },
    fileFilter: (_, file, cb) => {
        if (!ALLOWED_TYPES.includes(file.mimetype)) {
            cb(new Error('Invalid file type'), false);
            return;
        }
        cb(null, true);
    }
});

async function getFileId(originalName) {
    const [rows] = await pool.execute(
        'SELECT id FROM files WHERE original_name = ?',
        [originalName]
    );
    if (rows.length > 0) {
        return rows[0].id;
    } else {
        const [result] = await pool.execute(
            'INSERT INTO files (original_name) VALUES (?)',
            [originalName]
        );
        return result.insertId;
    }
}

async function getNextVersion(fileId) {
    const [rows] = await pool.execute(
        'SELECT MAX(version_number) as max_version FROM file_versions WHERE file_id = ?',
        [fileId]
    );
    return (rows[0].max_version || 0) + 1;
}

async function logDatabaseContents() {
    const [files] = await pool.execute('SELECT * FROM files');
    const [fileVersions] = await pool.execute('SELECT * FROM file_versions');
    console.log('Files:', files);
    console.log('File Versions:', fileVersions);
}

app.post('/upload', upload.single('file'), async (req, res, next) => {
    const connection = await pool.getConnection();
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        await connection.beginTransaction();

        const fileId = await getFileId(req.file.originalname);
        const version = await getNextVersion(fileId);

        await connection.execute(
            'INSERT INTO file_versions (file_id, version_number, file_path, mime_type, size) VALUES (?, ?, ?, ?, ?)',
            [fileId, version, req.file.filename, req.file.mimetype, req.file.size]
        );

        await connection.execute(
            'UPDATE files SET current_version = ? WHERE id = ?',
            [version, fileId]
        );

        await connection.commit();

        await logDatabaseContents();

        res.json({
            message: 'File uploaded successfully',
            fileId,
            version,
            originalName: req.file.originalname
        });
    } catch (err) {
        await connection.rollback();
        next(err);
    } finally {
        connection.release();
    }
});

app.get('/files/:fileId', async (req, res, next) => {
    try {
        const [fileInfo] = await pool.execute(
            'SELECT * FROM files WHERE id = ?',
            [req.params.fileId]
        );

        if (fileInfo.length === 0) {
            return res.status(404).json({ error: 'File not found' });
        }

        const [versions] = await pool.execute(
            'SELECT version_number, mime_type, size, uploaded_at FROM file_versions WHERE file_id = ? ORDER BY version_number',
            [req.params.fileId]
        );

        res.json({
            ...fileInfo[0],
            versions
        });
    } catch (err) {
        next(err);
    }
});

app.get('/download/:fileId/:version?', async (req, res, next) => {
    try {
        const version = req.params.version;
        let query = 'SELECT f.original_name, fv.file_path FROM files f ';
        query += 'JOIN file_versions fv ON f.id = fv.file_id ';
        query += version 
            ? 'WHERE f.id = ? AND fv.version_number = ?'
            : 'WHERE f.id = ? AND fv.version_number = f.current_version';

        const params = version ? [req.params.fileId, version] : [req.params.fileId];
        const [fileInfo] = await pool.execute(query, params);

        if (fileInfo.length === 0) {
            return res.status(404).json({ error: 'File not found' });
        }

        const filePath = path.join(UPLOAD_DIR, fileInfo[0].file_path);
        res.download(filePath, fileInfo[0].original_name, (err) => {
            if (err) {
                next(new Error('Error downloading file'));
            }
        });
    } catch (err) {
        next(err);
    }
});

app.delete('/files/:fileId/:version', async (req, res, next) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const [versionInfo] = await connection.execute(
            'SELECT file_path FROM file_versions WHERE file_id = ? AND version_number = ?',
            [req.params.fileId, req.params.version]
        );

        if (versionInfo.length === 0) {
            return res.status(404).json({ error: 'Version not found' });
        }

        const filePath = path.join(UPLOAD_DIR, versionInfo[0].file_path);
        await fs.remove(filePath);

        await connection.execute(
            'DELETE FROM file_versions WHERE file_id = ? AND version_number = ?',
            [req.params.fileId, req.params.version]
        );

        const [remainingVersions] = await connection.execute(
            'SELECT version_number FROM file_versions WHERE file_id = ? ORDER BY version_number DESC LIMIT 1',
            [req.params.fileId]
        );

        if (remainingVersions.length === 0) {
            await connection.execute(
                'DELETE FROM files WHERE id = ?',
                [req.params.fileId]
            );
        } else {
            await connection.execute(
                'UPDATE files SET current_version = ? WHERE id = ?',
                [remainingVersions[0].version_number, req.params.fileId]
            );
        }

        await connection.commit();
        await logDatabaseContents();
        res.json({ message: 'File version deleted successfully' });
    } catch (err) {
        await connection.rollback();
        next(err);
    } finally {
        connection.release();
    }
});

app.use((err, _, res, next) => {
    console.error(err);
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                error: `File size exceeds limit of ${MAX_FILE_SIZE / 1024 / 1024}MB`
            });
        }
    }
    res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
