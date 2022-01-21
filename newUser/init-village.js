const config = require('../config').config;
const mysql = require('mysql2/promise');
const db = require('../_helpers/db');

const initVillage = async (race, userID) => {
    const connection = await mysql.createConnection({
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database
    });
    const fetch = await connection.query(`SELECT * FROM MapTiles WHERE terrainType = 7 AND available = true ORDER BY RAND()LIMIT 1;`)
    const settlement = fetch[0][0];
    switch (race) {
        case '0':
            await connection.query(`UPDATE MapTiles
            SET foodStart = 100, 
                woodStart = 100, 
                stoneStart = 50, 
                ironStart = 20,
                silverStart = 10, 
                magicStart = 0, 
                hunters = '[0,0,0]', 
                fields = '[0,0]', 
                forest = '[0,0,0]', 
                stoneMine = '[]',
                ironMine = '[]', 
                silverMine = '[]'
             WHERE tileID = ${settlement.tileID}`);
            break;
        case '1':
            await connection.query(`UPDATE MapTiles
            SET foodStart = 100, 
                woodStart = 100, 
                stoneStart = 50, 
                ironStart = 20,
                silverStart = 10, 
                magicStart = 0, 
                hunters = '[0]', 
                fields = '[0,0,0,0]', 
                forest = '[0]', 
                stoneMine = '[0]',
                ironMine = '[]', 
                silverMine = '[]'
             WHERE tileID = ${settlement.tileID}`);
            break;
        case '2':
            await connection.query(`UPDATE MapTiles
            SET foodStart = 100, 
                woodStart = 100, 
                stoneStart = 50, 
                ironStart = 20,
                silverStart = 10, 
                magicStart = 0, 
                hunters = '[0,0,0,0]', 
                fields = '[0]', 
                forest = '[0,0,0,0]', 
                stoneMine = '[]',
                ironMine = '[]', 
                silverMine = '[]'
             WHERE tileID = ${settlement.tileID}`);
            break;
        default: 
            console.log('error with race parameter')
    }
    await db.MapTile.update({available: false, startGather: Date.now()},{where: {tileID: settlement.tileID}}).catch(e=> console.log(e));
    await db.User.update({ownVillagesArray: [settlement.tileID], capitalPositionX: settlement.positionX, capitalPositionY: settlement.positionY, gameStartTime: Date.now()}, {where: {userID: userID }}).catch(e => console.log(e))
}

module.exports = { initVillage };