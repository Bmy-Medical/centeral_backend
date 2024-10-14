// controllers/permissionController.js
const Permission = require('../models/Permission');

// Create a new permission
const createPermission = async (req, res) => {
    try {
        const { name, description } = req.body;

        // Check if the permission already exists
        const existingPermission = await Permission.findOne({ where: { name } });
        if (existingPermission) {
            return res.status(400).json({ message: 'Permission with this name already exists' });
        }

        // Create the new permission
        const permission = await Permission.create({ name, description });
        return res.status(201).json(permission);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};

// Get all permissions
const getAllPermissions = async (req, res) => {
    try {
        const permissions = await Permission.findAll();
        return res.status(200).json(permissions);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};

// Get a single permission by ID
const getPermissionById = async (req, res) => {
    try {
        const { id } = req.params;
        const permission = await Permission.findByPk(id);

        if (!permission) {
            return res.status(404).json({ message: 'Permission not found' });
        }

        return res.status(200).json(permission);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};

// Update a permission by ID
const updatePermission = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        // Find the permission by ID
        const permission = await Permission.findByPk(id);
        if (!permission) {
            return res.status(404).json({ message: 'Permission not found' });
        }

        // Update the permission
        permission.name = name || permission.name;
        permission.description = description || permission.description;

        await permission.save();
        return res.status(200).json(permission);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};

// Delete a permission by ID
const deletePermission = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the permission by ID
        const permission = await Permission.findByPk(id);
        if (!permission) {
            return res.status(404).json({ message: 'Permission not found' });
        }

        // Delete the permission
        await permission.destroy();
        return res.status(200).json({ message: 'Permission deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = {
    createPermission,
    getAllPermissions,
    getPermissionById,
    updatePermission,
    deletePermission
};
