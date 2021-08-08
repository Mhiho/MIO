const db = require('../_helpers/db');

module.exports = {
    ownMap,
}

async function ownMap(name) {
    const user = await db.User.findOne({where: {name: name}});
    return await db.MapTile.findOne({where: { positionX: user.dataValues.capitalPositionX, positionY: user.dataValues.capitalPositionY }});
}

