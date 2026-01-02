const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Please authenticate.' });
        }

        const token = authHeader.replace('Bearer ', '').trim();

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || 'secretkey'
        );

        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        // ✅ THIS IS CRITICAL
        req.user = user;
        req.token = token;

        next();
    } catch (err) {
        console.error('AUTH ERROR:', err.message);
        res.status(401).json({ error: 'Please authenticate.' });
    }
};
