const config = require('../config').config;
const mysql = require('mysql2/promise');


const initVillage = async (race) => {
    const connection = await mysql.createConnection({
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database
    });

    switch (race) {
        case '0':
            await connection.query(`INSERT INTO  (foodStart, woodStart, stoneStart, ironStart, silverStart, hunters, fields, forest, stoneMine, ironMine, silverMine) VALUES (100, 100, 50, 20, 10, [0,0,0,0], 0, [0,0,0,0], 0, 0, 0)`);
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

}

module.exports = { initVillage };