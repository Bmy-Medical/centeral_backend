// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../configs/connection'); // Adjust the path according to your structure

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true, // Enable createdAt and updatedAt fields
});

module.exports = User;
