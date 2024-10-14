// controllers/roleController.js

const Permission = require("../models/Permission");
const Role = require("../models/role");

 
// Create a new role
const createRole = async (req, res) => {
    const { name, description, permissions } = req.body;

    try {
        const role = await Role.create({ name, description });
        
        if (permissions && permissions.length > 0) {
            const permissionsToAdd = await Permission.findAll({
                where: {
                    id: permissions,
                },
            });
            await role.setPermissions(permissionsToAdd);
        }

        return res.status(201).json({ message: 'Role created successfully!', role });
    } catch (error) {
        return res.status(500).json({ message: 'Error creating role', error });
    }
};

// Get all roles
const getAllRoles = async (req, res) => {
    try {
        const roles = await Role.findAll({ include: Permission });
        return res.status(200).json(roles);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching roles', error });
    }
};

// Get a single role by ID
const getRoleById = async (req, res) => {
    const { id } = req.params;

    try {
        const role = await Role.findByPk(id, { include: Permission });
        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }
        return res.status(200).json(role);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching role', error });
    }
};

// Update a role
const updateRole = async (req, res) => {
    const { id } = req.params;
    const { name, description, permissions } = req.body;

    try {
        const role = await Role.findByPk(id);
        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }

        role.name = name || role.name;
        role.description = description || role.description;

        await role.save();

        if (permissions && permissions.length > 0) {
            const permissionsToAdd = await Permission.findAll({
                where: {
                    id: permissions,
                },
            });
            await role.setPermissions(permissionsToAdd);
        }

        return res.status(200).json({ message: 'Role updated successfully!', role });
    } catch (error) {
        return res.status(500).json({ message: 'Error updating role', error });
    }
};

// Delete a role
const deleteRole = async (req, res) => {
    const { id } = req.params;

    try {
        const role = await Role.findByPk(id);
        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }

        await role.destroy();
        return res.status(200).json({ message: 'Role deleted successfully!' });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting role', error });
    }
};

module.exports = {
    createRole,
    getAllRoles,
    getRoleById,
    updateRole,
    deleteRole,
};
