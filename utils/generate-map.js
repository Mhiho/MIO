const config = require('../config').config;
const mysql = require('mysql2/promise');

const generateMap = async () => {
    const connection = await mysql.createConnection({
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database
    });
    const count = 201;
    for(var i = 1; i < count; i++){
        for(var j = 1; j < count; j++){
            let c = Math.floor(Math.random()* (7 - 1)) + 1;
            await connection.query(`INSERT INTO MapTiles (positionX , positionY, terrainType) VALUES (${i}, ${j}, ${c});`)
            console.log(`row added with value ${c}`)
        }
    }
    console.log('done')
}

generateMap().catch(console.error)