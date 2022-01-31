const config = require('../config').config;
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');
const lorisArmy = require('../initialData/lorisArmy');
const ibisArmy = require('../initialData/ibisArmy');
const wildArmy = require('../initialData/wildArmy');
const lorisBuildings = require('../initialData/lorisBuildings');
const ibisBuildings = require('../initialData/ibisBuildings');
const wildsBuildings = require('../initialData/wildBuildings');
const { generateMap } = require('../utils/generate-map');

module.exports = db = {};

const setXY = 60;
const setDLength = setXY * setXY
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
    db.Token = require('../tokens/token.model')(sequelize);
    db.ArmyHern = require('../game.models/hern-army.model')(sequelize);
    db.ArmyIbis = require('../game.models/ibis-army.model')(sequelize);
    db.ArmyWild = require('../game.models/wild-army.model')(sequelize);
    db.BuildingsHern = require('../game.models/hern-buildings.model')(sequelize);
    db.BuildingsIbis = require('../game.models/ibis-buildings.model')(sequelize);
    db.BuildingsWild = require('../game.models/wild-buildings.model')(sequelize);
    db.MapTile = require('../game.models/map-tile.model')(sequelize);
    
    //add dependencies between models
    db.Token.belongsTo(db.User, {foreignKey: 'userID', as: 'UserID'});
    // sync all models with database
    await sequelize.sync();
    await connection.query(lorisArmy);
    await connection.query(ibisArmy);
    await connection.query(wildArmy);
    await connection.query(lorisBuildings);
    await connection.query(ibisBuildings);
    await connection.query(wildsBuildings);

    const d = await db.MapTile.findAll();
    if(d.length !== setDLength) {
      await generateMap().catch(console.error);
    }
}; 


initialize().catch(console.error);