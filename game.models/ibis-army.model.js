const { DataTypes, DATE } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        armyIbisID: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
        armyIbisName: {type: DataTypes.STRING, allowNull: false},
        attack: {type: DataTypes.INTEGER, allowNull: false},
        defense: {type: DataTypes.INTEGER, allowNull: false},
        weapon: {type: DataTypes.DECIMAL, allowNull: false},
        armor: {type: DataTypes.DECIMAL, allowNull: false},
        maintenance: {type: DataTypes.INTEGER, allowNull: false},
        carry: {type: DataTypes.INTEGER, allowNull: false},
        hitpoints: {type: DataTypes.INTEGER, allowNull: false},
        exp: {type: DataTypes.INTEGER, allowNull: false}
    };

    return sequelize.define('ArmyIbis', attributes);
}