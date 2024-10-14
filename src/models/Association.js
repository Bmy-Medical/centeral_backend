const User = require('./User');
const Permission = require('./Permission');
const Role = require('./role');
const SeedPermissions = require('./seedPermission');
 
const setupAssociations = () => {
    // Define User <-> Role many-to-many relationship
    User.belongsToMany(Role, { through: 'UserRole', foreignKey: 'userId' });
    Role.belongsToMany(User, { through: 'UserRole', foreignKey: 'roleId' });

    // Define Role <-> Permission many-to-many relationship
    Role.belongsToMany(Permission, { through: 'RolePermission', foreignKey: 'roleId' });
    Permission.belongsToMany(Role, { through: 'RolePermission', foreignKey: 'permissionId' });

    //sync crud permission
    SeedPermissions()

 };

module.exports = setupAssociations;
