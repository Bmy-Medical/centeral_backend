const { DataTypes } = require('sequelize');
const sequelize = require('../configs/connection');

const RolePermission = sequelize.define('RolePermission', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
});

module.exports = RolePermission;
