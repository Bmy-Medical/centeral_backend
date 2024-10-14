
const { Sequelize } = require('sequelize');
const fs = require('fs');

require('dotenv').config();


const DATABASE_URL = process.env.DATABASE_URL;

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: true,
      ca: fs.readFileSync(process.env.SSL_CA_PATH).toString(),
    }
  },
  logging: false, // Disable query logging

});

module.exports = sequelize;
