const config = require('../config').config;
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

module.exports = db = {};


const initialize = async () => {
    // create db if it doesn't already exist
    const connection = await mysql.createConnection({
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database
      });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${config.database}\`;`);
    await connection.query(`SET GLOBAL sql_mode = '';`);

    // connect to db
    const sequelize = new Sequelize(config.database, config.user, config.password, { dialect: 'mysql' });

    // init models and add them to the exported db object
    db.User = require('../users/user.model')(sequelize);

    // sync all models with database
    await sequelize.sync();
}; 

initialize().catch(console.error);