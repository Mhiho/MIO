const config = require('../config').config;
const mysql = require('mysql2/promise');


const generateMap = async () => {
    const setXY = 60;
    const dragonGen = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,2,2,3]
    const connection = await mysql.createConnection({
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database
    });
    const count = setXY + 1
    for(let i = 1; i < count; i++){
        for(let j = 1; j < count; j++){
            const terrainGen = [1,1,1,1,2,2,3,3,4,5,5,6,6,6,7,7,7,7,7,8]
            let terrainRand = Math.floor(Math.random()* (terrainGen.length));
            let terrainType = terrainGen[terrainRand];
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
            let rhino = Math.floor(Math.random()* (8 - 1)) + 1;
            let lion = Math.floor(Math.random()* (15 - 1)) + 1;
            let random = Math.floor(Math.random() * (dragonGen.length -1) + 1);
            let dragon = dragonGen[random];
            await connection.query(`UPDATE MapTiles SET scorpio = ${scorpio}, wildDog = ${wildDog}, snake = ${snake}, lion =${lion}, rhino = ${rhino}, dragon = ${dragon} WHERE terrainType = 8 AND positionX = ${i} AND positionY = ${j};`)
        }
    }
    console.log('update uroczyska done');
    const dragonFull = await connection.query('Select tileID,dragon,ancientArtifact from MapTiles where dragon > 2');
    console.log(`possible slots for artifacts = ${dragonFull[0].length}`)
    const randomFive = [];
    for(let i = 0; i < 5; i++){
        let strike = Math.floor(Math.random()* (dragonFull[0].length -1) +1)
        randomFive.push(dragonFull[0][strike])
        dragonFull[0].splice(strike, 1);
    }
    for(let i = 0; i < 5; i++){
        await connection.query(`UPDATE MapTiles SET ancientArtifact = true WHERE tileID = ${randomFive[i].tileID}`)
    }
    console.log('artifacts added')

    for(let i = 1; i < count; i++){
        for(let j = 1; j < count; j++){
            let luck = Math.floor(Math.random()*(5-1) +1);
            await connection.query(`UPDATE MapTiles SET foodStart = foodStart *ROUND(scorpio+wildDog*1.5+snake*2+lion*3+rhino*4+dragon*30) WHERE terrainType = 8 AND positionX = ${i} AND positionY = ${j};`)
            await connection.query(`UPDATE MapTiles SET woodStart = woodStart *ROUND(scorpio+wildDog*1.5+snake*2+lion*3+rhino*4+dragon*30) WHERE terrainType = 8 AND positionX = ${i} AND positionY = ${j};`)
            await connection.query(`UPDATE MapTiles SET ironStart = ironStart *ROUND(scorpio+wildDog*1.5+snake*2+lion*3+rhino*4+dragon*30) WHERE terrainType = 8 AND positionX = ${i} AND positionY = ${j};`)
            await connection.query(`UPDATE MapTiles SET stoneStart = stoneStart *ROUND(lion*3+rhino*4+dragon*30) WHERE terrainType = 8 AND positionX = ${i} AND positionY = ${j};`)
            await connection.query(`UPDATE MapTiles SET silverStart = silverStart *ROUND(rhino*4+dragon*10) WHERE terrainType = 8 AND positionX = ${i} AND positionY = ${j};`)
            await connection.query(`UPDATE MapTiles SET dragonCrystalStart = (dragonCrystalStart + ${luck}) *ROUND(dragon*3) WHERE terrainType = 8 AND positionX = ${i} AND positionY = ${j};`)
            await connection.query(`UPDATE MapTiles SET dragonCrystalStart = 0 WHERE terrainType != 8 AND positionX = ${i} AND positionY = ${j};`)
        }
    }
    //
    console.log('ressources update done')
    console.log('map ready')
}

module.exports = { generateMap }