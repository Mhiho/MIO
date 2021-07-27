const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        armyIbisID: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
        armyIbisName: {type: DataTypes.STRING, allowNull: false},
        attack: {type: DataTypes.INTEGER, allowNull: false},
        defense: {type: DataTypes.STRING, allowNull: false},
        weapon: {type: DataTypes.STRING, allowNull: false},
        armor: {type: DataTypes.STRING, allowNull: false},
        maintenance: {type: DataTypes.INTEGER, allowNull: false},
        ressourceCarry: {type: DataTypes.INTEGER, allowNull: false},
    };

    return sequelize.define('ArmyIbis', attributes);
}