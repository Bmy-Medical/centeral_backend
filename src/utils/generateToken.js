const jwt = require('jsonwebtoken');

// Replace with your own secret key
const JWT_SECRET = process.env.JWT_SECRET  
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1h'; // Token expiration time

// Function to generate a token
const generateToken = (userId, rolesWithPermissions) => {
    const payload = {
        userId,
        roles: rolesWithPermissions.map(role => role.name),  
    };

    // Generate a signed JWT
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
};

module.exports = generateToken

