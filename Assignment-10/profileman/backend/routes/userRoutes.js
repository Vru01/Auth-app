const express = require('express');
const { getUser, updateUser, deleteUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/profile', protect, getUser);
router.put('/profile', protect, updateUser);
router.delete('/profile', protect, deleteUser);

module.exports = router;
