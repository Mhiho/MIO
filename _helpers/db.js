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
    db.ArmyHern = require('../game.models/hern-army.model')(sequelize);
    db.ArmyIbis = require('../game.models/ibis-army.model')(sequelize);
    db.ArmyWild = require('../game.models/wild-army.model')(sequelize);
    db.VillageHern = require('../game.models/hern-village.model')(sequelize);
    db.VillageIbis = require('../game.models/ibis-village.model')(sequelize);
    db.VillageWild = require('../game.models/wild-village.model')(sequelize);
    db.CastleHern = require('../game.models/hern-castle.model')(sequelize);
    db.CastleIbis = require('../game.models/ibis-castle.model')(sequelize);
    db.CastleWild = require('../game.models/wild-castle.model')(sequelize);
    db.MapTile = require('../game.models/map-tile.model')(sequelize);
    // sync all models with database
    await sequelize.sync();
}; 

initialize().catch(console.error);