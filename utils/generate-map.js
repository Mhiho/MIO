const config = require('../config').config;
const mysql = require('mysql2/promise');

const dragonGen = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,2,2,3]
const generateMap = async () => {
    const connection = await mysql.createConnection({
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database
    });
    const count = 31;
    for(let i = 1; i < count; i++){
        for(let j = 1; j < count; j++){
            
            let terrainType = Math.floor(Math.random()* (9 - 1) + 1);
            await connection.query(`INSERT INTO MapTiles (positionX , positionY, terrainType) VALUES (${i}, ${j}, ${terrainType});`)
            console.log(`row added with value terrain: ${terrainType}`)
        }
    }
    console.log('generate done')
    for(let i = 1; i < count; i++){
        for(let j = 1; j < count; j++){
            let scorpio = Math.floor(Math.random()* (31 - 1)) + 1;
            let wildDog = Math.floor(Math.random()* (21 - 1)) + 1;
            let snake = Math.floor(Math.random()* (11 - 1)) + 1;
            let elephant = Math.floor(Math.random()* (8 - 1)) + 1;
            let lion = Math.floor(Math.random()* (15 - 1)) + 1;
            let random = Math.floor(Math.random() * dragonGen.length);
            let dragon = dragonGen[random];
            await connection.query(`UPDATE MapTiles SET scorpio = ${scorpio}, wildDog = ${wildDog}, snake = ${snake}, lion =${lion}, elephant = ${elephant}, dragon = ${dragon} WHERE terrainType = 8 AND positionX = ${i} AND positionY = ${j};`)
        }
    }
    console.log('update uroczyska done');
    for(let i = 1; i < count; i++){
        for(let j = 1; j < count; j++){
            let luck = Math.floor(Math.random()*(5-1) +1);
            await connection.query(`UPDATE MapTiles SET foodStart = foodStart *ROUND(scorpio+wildDog*1.5+snake*2+lion*3+elephant*4+dragon*30) WHERE terrainType = 8 AND positionX = ${i} AND positionY = ${j};`)
            await connection.query(`UPDATE MapTiles SET woodStart = woodStart *ROUND(scorpio+wildDog*1.5+snake*2+lion*3+elephant*4+dragon*30) WHERE terrainType = 8 AND positionX = ${i} AND positionY = ${j};`)
            await connection.query(`UPDATE MapTiles SET ironStart = ironStart *ROUND(scorpio+wildDog*1.5+snake*2+lion*3+elephant*4+dragon*30) WHERE terrainType = 8 AND positionX = ${i} AND positionY = ${j};`)
            await connection.query(`UPDATE MapTiles SET stoneStart = stoneStart *ROUND(lion*3+elephant*4+dragon*30) WHERE terrainType = 8 AND positionX = ${i} AND positionY = ${j};`)
            await connection.query(`UPDATE MapTiles SET silverStart = silverStart *ROUND(elephant*4+dragon*10) WHERE terrainType = 8 AND positionX = ${i} AND positionY = ${j};`)
            await connection.query(`UPDATE MapTiles SET dragonCrystalStart = (dragonCrystalStart + ${luck}) *ROUND(dragon*3) WHERE terrainType = 8 AND positionX = ${i} AND positionY = ${j};`)
            await connection.query(`UPDATE MapTiles SET dragonCrystalStart = 0 WHERE terrainType != 8 AND positionX = ${i} AND positionY = ${j};`)
        }
    }
    console.log('ressources update done')
}
generateMap().catch(console.error);