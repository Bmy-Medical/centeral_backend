// routes/permissionRoutes.js
const express = require('express');
const router = express.Router();
const {
    createPermission,
    getAllPermissions,
    getPermissionById,
    updatePermission,
    deletePermission
} = require('../controllers/permissionController');

// Route to create a new permission
router.post('/add', createPermission);

// Route to get all permissions
router.get('/all', getAllPermissions);

// Route to get a single permission by ID
router.get('/one/:id', getPermissionById);

// Route to update a permission by ID
router.patch('/edit/:id', updatePermission);

// Route to delete a permission by ID
router.delete('/delete/:id', deletePermission);

module.exports = router;
