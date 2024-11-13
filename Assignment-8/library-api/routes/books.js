const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookcon');
const verifyToken = require('../middleware/auth');

router.post('/', verifyToken, bookController.addBook);
router.put('/:id', verifyToken, bookController.updateBook);
router.delete('/:id', verifyToken, bookController.deleteBook);
router.get('/', verifyToken, bookController.getBooks);  

module.exports = router;
