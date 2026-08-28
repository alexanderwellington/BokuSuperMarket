const jwt = require('jsonwebtoken');

// middleware to verify the token

exports.protect = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; // Get token from header
    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token provided' });
    }       

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Not authorized, Invalid token' });
    }
};