const { Sequelize } = require('sequelize');
const config = require('../config');

//? Create a connection to database
const db = new Sequelize({
    dialect: 'postgres',
    host: config.db.host,
    username: config.db.username,
    password: config.db.password,
    database: config.db.database,
     logging: false,
});

module.exports = { db };
