const db = require('../_helpers/db');

module.exports = {
    ownCenterMap,
    wholeMap,
}

async function ownCenterMap(name) {
    const user = await db.User.findOne({where: {name: name}});
    return await db.MapTile.findOne({where: { positionX: user.dataValues.capitalPositionX, positionY: user.dataValues.capitalPositionY }});
}

async function wholeMap(name) {
    const user = await db.User.findOne({where: {name: name}});
    const map = await db.MapTile.findAll();
    return {
        user,
        map
    }
}

