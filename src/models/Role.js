// models/Role.js
const { DataTypes } = require('sequelize');
const sequelize = require('../configs/connection'); // Adjust the path according to your structure

const Role = sequelize.define('Role', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    description: {
        type: DataTypes.STRING,
    },
    // Additional fields for role attributes can be added as needed
}, {
    timestamps: true, // Enable createdAt and updatedAt fields
});

module.exports = Role;
