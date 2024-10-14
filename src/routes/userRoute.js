// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { login, register } = require('../controllers/userController');
const authentication = require('../middlewares/autentication');

// Route for user login (No authentication required)
router.post('/login', authentication,login);

// Route for user registration (No authentication required)
router.post('/register', register);

// Example: protected route (requires authentication)
router.get('/protected', authentication, (req, res) => {
    res.status(200).json({ message: `Hello, ${req.user.userId}. You have access to this protected route!` });
});

module.exports = router;
