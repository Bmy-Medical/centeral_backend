const Permission  = require('./Permission');
const { v4: uuidv4 } = require('uuid');
const sequelize = require('../configs/connection'); // Ensure this is your Sequelize connection file

const permissions = [
    { id: uuidv4(), name: 'CREATE_USER', description: 'Allows creating a new user.' },
    { id: uuidv4(), name: 'EDIT_USER', description: 'Allows editing an existing user.' },
    { id: uuidv4(), name: 'DELETE_USER', description: 'Allows deleting a user.' },
    { id: uuidv4(), name: 'VIEW_USERS', description: 'Allows viewing reports.' },
    // Add more predefined permissions as needed
];


const SeedPermissions = async () => {
    try {
        await sequelize.sync();
        await Permission.bulkCreate(permissions, { ignoreDuplicates: true });
        console.log('Permissions have been seeded.');
    } catch (error) {
        console.error('Error seeding permissions:', error);
    }
};


module.exports = SeedPermissions;
