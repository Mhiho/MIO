const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        tileID: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},  
        positionX: {type: DataTypes.INTEGER, allowNull: true},
        positiony: {type: DataTypes.INTEGER, allowNull: true},
        terrainType: {type: DataTypes.ENUM('0','1','2','3','4','5','6'), allowNull: true},        
    };
    return sequelize.define('MapTile', attributes);
}