// models/UserRole.js
const { DataTypes } = require('sequelize');
const sequelize = require('../configs/connection'); // Adjust the path according to your structure

const UserRole = sequelize.define('UserRole', {
    // This can include additional attributes if necessary, such as timestamps
}, {
    timestamps: true, // Enable createdAt and updatedAt fields
});

module.exports = UserRole;
