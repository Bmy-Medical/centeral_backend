const express = require('express');
const router = express.Router();
const { createRole, getAllRoles, getRoleById, updateRole, deleteRole } = require('../controllers/RoleController');
const authentication = require('../middlewares/autentication');
const authorization = require('../middlewares/autorization');

// Route to create a new role (only accessible by admins, for example)
router.post('/add',
    // authentication, authorization('ADMIN'),
    createRole);


// Route to get all roles (accessible by authenticated users)
router.get('/all', getAllRoles);

// Route to get a specific role by ID (accessible by authenticated users)
router.get('/one/:id', authentication, getRoleById);

// Route to update a role (only accessible by admins)
router.put('/edit/:id', authentication, authorization('Admin'), updateRole);

// Route to delete a role (only accessible by admins)
router.delete('/delete/:id', authentication, authorization('Admin'), deleteRole);

module.exports = router;
