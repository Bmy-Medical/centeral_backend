// src/models/Permission.js
const { DataTypes } = require('sequelize');
const sequelize = require('../configs/connection');
const Permission = sequelize.define('Permission', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true, // Optional field for the description
    }
});

module.exports = Permission;
