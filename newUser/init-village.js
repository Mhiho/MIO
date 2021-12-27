const config = require('../config').config;
const mysql = require('mysql2/promise');
const db = require('../_helpers/db');

const initVillage = async (race) => {
    const connection = await mysql.createConnection({
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database
    });
    const fetch = await connection.query(`SELECT * FROM MapTiles WHERE terrainType = 7 AND available = true ORDER BY RAND()LIMIT 1;`)
    const settlement = fetch[0][0];
    console.log(settlement)
    switch (race) {
        case '0':
            await connection.query(`UPDATE MapTiles
            SET foodStart = 100, 
                woodStart = 100, 
                stoneStart = 50, 
                ironStart = 20,
                silverStart = 10, 
                magicStart = 0, 
                hunters = '{"hunters": [0,0,0,0]}', 
                fields = '{"fields": [0]}', 
                forest = '{"forest": [0,0,0,0]}', 
                stoneMine = '{}',
                ironMine = '{}', 
                silverMine = '{}'
             WHERE tileID = ${settlement.tileID}`);
            break;
        case '1':
            await connection.query(`INSERT INTO  () VALUES ()`);
            break;
        case '2':
            await connection.query(`INSERT INTO  () VALUES ()`);
            break;
        default: 
            console.log('error with race parameter')
    }
    await db.MapTile.update({available: false},{where: {tileID: settlement.tileID}}).catch(e=> console.log(e));

}

module.exports = { initVillage };