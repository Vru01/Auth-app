const db = require('../config/db');

exports.addBook = (req, res) => {
  const { title, author, genre, year_of_publication } = req.body;

  db.query(
    'INSERT INTO books (title, author, genre, year_of_publication) VALUES (?, ?, ?, ?)',
    [title, author, genre, year_of_publication],
    (err, results) => {
      if (err) return res.status(500).send('Error adding book');
      res.status(201).send('Book added successfully');
    }
  );
};

exports.updateBook = (req, res) => {
  const { id } = req.params;
  const { title, author, genre, year_of_publication } = req.body;

  db.query(
    'UPDATE books SET title = ?, author = ?, genre = ?, year_of_publication = ? WHERE id = ?',
    [title, author, genre, year_of_publication, id],
    (err, results) => {
      if (err) return res.status(500).send('Error updating book');
      res.status(200).send('Book updated successfully');
    }
  );
};

exports.deleteBook = (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM books WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).send('Error deleting book');
    res.status(200).send('Book deleted successfully');
  });
};

exports.getBooks = (req, res) => {
  const { genre, author, page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  let query = 'SELECT * FROM books WHERE 1=1';
  const queryParams = [];

  if (genre) {
    query += ' AND genre = ?';
    queryParams.push(genre);
  }

  if (author) {
    query += ' AND author = ?';
    queryParams.push(author);
  }

  query += ' LIMIT ? OFFSET ?';
  queryParams.push(parseInt(limit), parseInt(offset));

  db.query(query, queryParams, (err, results) => {
    if (err) return res.status(500).send('Error fetching books');
    res.status(200).send(results);
  });
};
