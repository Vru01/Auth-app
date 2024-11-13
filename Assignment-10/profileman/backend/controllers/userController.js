const User = require('../models/User');

exports.getUser = (req, res) => {
    const userId = req.user.id;

    User.findById(userId, (err, result) => {
        if (err || result.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(result[0]);
    });
};

exports.updateUser = (req, res) => {
    const userId = req.user.id;
    const { name, phone, address } = req.body;

    User.update(userId, { name, phone, address }, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error updating user' });
        }
        res.json({ message: 'Profile updated successfully' });
    });
};

exports.deleteUser = (req, res) => {
    const userId = req.user.id;

    User.delete(userId, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error deleting user' });
        }
        res.json({ message: 'User deleted successfully' });
    });
};
