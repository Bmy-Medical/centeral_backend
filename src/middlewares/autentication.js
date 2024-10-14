// middleware/authentication.js
const jwt = require('jsonwebtoken');

const authentication = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Expecting format: "Bearer TOKEN"

    if (!token) {
        return res.status(401).json({ message: 'No token provided. Access denied.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Store the decoded token payload (userId, roles) in req.user
        next(); 
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token. Access denied.' });
    }
};

module.exports = authentication;
