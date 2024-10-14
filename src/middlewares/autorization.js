// middleware/authorization.js
const authorize = (requiredRoles) => {
    return (req, res, next) => {
        const userRoles = req.user.roles; // This assumes that roles are stored in the token and available in req.user

        // Check if user has any of the required roles
        const hasRole = userRoles.some(role => requiredRoles.includes(role));

        if (!hasRole) {
            return res.status(403).json({ message: 'Access denied. You do not have the required role.' });
        }

        next(); // User has required role, so allow access to the route
    };
};

module.exports = authorize;
