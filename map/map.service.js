const db = require('../_helpers/db');

module.exports = {
    ownCenterMap,
    wholeMap,
    tileMap,
    tileMapXY,
}

async function ownCenterMap(name) {
    const user = await db.User.findOne({where: {name: name}});
    return await db.MapTile.findOne({where: { positionX: user.dataValues.capitalPositionX, positionY: user.dataValues.capitalPositionY }});
}

async function wholeMap(name) {
    const user = await db.User.findOne({where: {name: name}});
    const map = await db.MapTile.findAll({attributes: ['tileID', 'race', 'name', 'positionX', 'positionY', 'terrainType']});
    return {
        user,
        map
    }
}
async function tileMap(tileID) {
    return await db.MapTile.findOne({where: {tileID}});
}

async function tileMapXY(X,Y) {
    return await db.MapTile.findOne({where: {positionX: X, positionY: Y}});
}


