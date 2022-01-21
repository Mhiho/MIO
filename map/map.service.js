const db = require("../_helpers/db");

module.exports = {
  ownCenterMap,
  wholeMap,
  tileMap,
  tileMapXY,
  capitalView,
};

async function ownCenterMap(name) {
  const user = await db.User.findOne({ where: { name: name } });
  return await db.MapTile.findOne({
    where: {
      positionX: user.dataValues.capitalPositionX,
      positionY: user.dataValues.capitalPositionY,
    },
  });
}

async function wholeMap(name) {
  const user = await db.User.findOne({ where: { name: name } });
  const map = await db.MapTile.findAll({
    attributes: [
      "tileID",
      "race",
      "name",
      "positionX",
      "positionY",
      "terrainType",
    ],
  });
  return {
    user,
    map,
  };
}
async function tileMap(tileID) {
  return await db.MapTile.findOne({ where: { tileID } });
}

async function tileMapXY(X, Y) {
  return await db.MapTile.findOne({ where: { positionX: X, positionY: Y } });
}

async function capitalView(X, Y) {
  const arrayX = () => {
    const arr = [];
    let n = X - 5;
    for (let i = 0; i < 11; i++) {
      arr.push(n);
      n = n + 1;
    }
    return arr;
  };
  const arX = arrayX()
  const arrayY = () => {
    const arr = [];
    let n = Y - 5;
    for (let i = 0; i < 11; i++) {
      arr.push(n);
      n = n + 1;
    }
    return arr;
};
  const arY = arrayY();
  const result = async () => {
    const array = []
    for (let i = 0; i < arX.length; i++) {
      for (let j = 0; j < arY.length; j++) {
        let one = arX[i] > 0 && arY[j] > 0 ? await db.MapTile.findOne({where: { positionX: arX[i], positionY: arY[j] }}) : null;
        array.push(one)
    }
    }
    return array;
  };
  const res = result()
  return res;
}
