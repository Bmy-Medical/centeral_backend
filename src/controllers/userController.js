// userController.js
const bcrypt = require('bcryptjs');
const isValidPassword = require("../helpers/validatePassword");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const { publishMessage } = require("../services/messageBroker");
const Role = require('../models/role');
const Permission = require('../models/Permission');

// Register user
exports.register = async (req, res) => {
    const { email, password, roleIds } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user
        const newUser = await User.create({
            email,
            password: hashedPassword,
        });

        // Assign roles to the user if provided
        if (roleIds && roleIds.length > 0) {
            const roles = await Role.findAll({ where: { id: roleIds } });
            await newUser.setRoles(roles); // Many-to-many relationship between User and Role
        }

        // Get the assigned roles
        const roles = await newUser.getRoles();



        // Publish a "UserRegistered" message to the message broker
        publishMessage('UserRegistered', {
            userId: newUser.id,
            email: newUser.email,
            roles: roles.map(role => role.name),
        });

        return res.status(201).json({
            message: 'User registered successfully',
            roles: roles.map(role => role.name), // Return role names
        });

    } catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).json({
            message: 'Error registering user',
            error: error.message,
        });
    }
};

// Login user
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validate user credentials
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const passwordValid = await isValidPassword(password, user.password);
        if (!passwordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Fetch user roles and permissions, excluding the UserRole data
        const rolesWithPermissions = await user.getRoles({
            attributes: ['id', 'name'], // Include only relevant role fields
            include: [
                {
                    model: Permission,
                    attributes: ['id', 'name', 'description'], // Include specific permission fields
                    through: { attributes: [] }, // Exclude RolePermission data
                },
            ],
            // Exclude UserRole from the result
            through: {
                attributes: [], // This will exclude the UserRole attributes from the response
            },
        });

        // Generate a JWT token
        const token = generateToken(user.id, rolesWithPermissions);

        return res.status(200).json({
            message: 'Login successful',
            token,
            user,
            roles: rolesWithPermissions, // Return roles with permissions, excluding UserRole
        });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({
            message: 'Error during login',
            error: error.message,
        });
    }
};

