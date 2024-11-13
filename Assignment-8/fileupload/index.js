const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        const originalName = file.originalname;
        const newName = `${timestamp}-${originalName}`;
        cb(null, newName);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|pdf|doc|docx/;
        const mimeType = allowedTypes.test(file.mimetype);
        const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());

        if (mimeType && extName) {
            return cb(null, true);
        }
        cb(new Error('Invalid file type. Only images and documents are allowed.'));
    }
});

app.use(express.json());

app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    res.status(200).send({
        message: 'File uploaded successfully.',
        fileName: req.file.filename
    });
});

app.get('/download/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'uploads', filename);

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).send('File not found.');
        }
        res.download(filePath, filename, (downloadErr) => {
            if (downloadErr) {
                console.error('Error downloading file:', downloadErr);
                res.status(500).send('Error downloading file.');
            }
        });
    });
});

app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).send({ error: err.message });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
