const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        tileID: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},  
        positionX: {type: DataTypes.INTEGER, allowNull: true},
        positionY: {type: DataTypes.INTEGER, allowNull: true},
        terrainType: {type: DataTypes.ENUM('1','2','3','4','5','6','7','8'), allowNull: true},
        createdAt: { type: DataTypes.DATE, defaultValue: '00' },       
        updatedAt: { type: DataTypes.DATE, defaultValue: '00' },
        foodStart: {type: DataTypes.INTEGER, allowNull: true, defaultValue: 100},
        ironStart: {type: DataTypes.INTEGER, allowNull: true, defaultValue: 10},
        stoneStart: {type: DataTypes.INTEGER, allowNull: true, defaultValue: 20},
        woodStart: {type: DataTypes.INTEGER, allowNull: true, defaultValue: 100},
        silverStart: {type: DataTypes.INTEGER, allowNull: true, defaultValue: 3},
        dragonCrystalStart: {type: DataTypes.INTEGER, allowNull: true, defaultValue: 1},
        crop: { type: DataTypes.JSON },
        forest: { type: DataTypes.JSON },
        silverMine: { type: DataTypes.JSON },
        ironMine: {type: DataTypes.JSON},
        stoneMine: { type: DataTypes.JSON },
        wildDog: {type: DataTypes.INTEGER, allowNull: true, defaultValue: 0},
        scorpio: {type: DataTypes.INTEGER, allowNull: true, defaultValue: 0},
        snake: {type: DataTypes.INTEGER, allowNull: true, defaultValue: 0},
        elephant: {type: DataTypes.INTEGER, allowNull: true, defaultValue: 0},
        lion: {type: DataTypes.INTEGER, allowNull: true, defaultValue: 0},
        dragon: {type: DataTypes.INTEGER, allowNull: true, defaultValue: 0},
        wildDogField: {type: DataTypes.INTEGER, allowNull: true},
        scorpioField: {type: DataTypes.INTEGER, allowNull: true},
        snakeField: {type: DataTypes.INTEGER, allowNull: true},
        elephantField: {type: DataTypes.INTEGER, allowNull: true},
        lionField: {type: DataTypes.INTEGER, allowNull: true},
        dragonField: {type: DataTypes.INTEGER, allowNull: true},
    };
    return sequelize.define('MapTile', attributes);
}
// terrainType:

// 1 - las
// 2 - złoże kamienia
// 3 - złoże srebra
// 4 - ruiny zamku
// 5 - złoże rudy
// 6 - pola
// 7 - łąka
// 8 - uroczysko