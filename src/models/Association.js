const User = require('./User');
const Permission = require('./Permission');
const UserRole = require('./UserRole');
const RolePermission = require('./RolePermission');
const Role = require('./role');

const setupAssociations = () => {
    // Define User <-> Role many-to-many relationship
    User.belongsToMany(Role, { through: UserRole, foreignKey: 'userId' });
    Role.belongsToMany(User, { through: UserRole, foreignKey: 'roleId' });

    // Define Role <-> Permission many-to-many relationship
    Role.belongsToMany(Permission, { through: RolePermission, foreignKey: 'roleId' });
    Permission.belongsToMany(Role, { through: RolePermission, foreignKey: 'permissionId' });
};

module.exports = setupAssociations;
