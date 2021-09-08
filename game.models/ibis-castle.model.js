const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        castleIbisID: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
        castleName: {type: DataTypes.STRING, allowNull: true },
        foodRateBonus: {type: DataTypes.DECIMAL, allowNull: true},
        magicRateBonus: {type: DataTypes.DECIMAL, allowNull: true},
        woodRateBonus: {type: DataTypes.DECIMAL, allowNull: true},
        ironRateBonus: {type: DataTypes.DECIMAL, allowNull: true},
        silverRateBonus: {type: DataTypes.DECIMAL, allowNull: true},
        foodStart: {type: DataTypes.INTEGER, allowNull: true},
        ironStart: {type: DataTypes.INTEGER, allowNull: true},
        stoneStart: {type: DataTypes.INTEGER, allowNull: true},
        woodStart: {type: DataTypes.INTEGER, allowNull: true},
        magicStart: {type: DataTypes.INTEGER, allowNull: true},
        silverStart: {type: DataTypes.INTEGER, allowNull: true},
        militia: {type: DataTypes.INTEGER, allowNull: true},
        soldier: {type: DataTypes.INTEGER, allowNull: true},
        horseMan: {type: DataTypes.INTEGER, allowNull: true},
        ramMan: {type: DataTypes.INTEGER, allowNull: true},
        siegeTower: {type: DataTypes.INTEGER, allowNull: true},
        barracks: {type: DataTypes.INTEGER, allowNull: true},
        chapel: {type: DataTypes.INTEGER, allowNull: true},
        spyGuild: {type: DataTypes.INTEGER, allowNull: true},
        trainingGrounds: {type: DataTypes.INTEGER, allowNull: true},
        monk: {type: DataTypes.INTEGER, allowNull: true},
        stables: {type: DataTypes.INTEGER, allowNull: true},
        workshop: {type: DataTypes.INTEGER, allowNull: true},
        fortifications: {type: DataTypes.JSON, allowNull: true},
        knight: {type: DataTypes.INTEGER, allowNull: true},
        blacksmith: {type: DataTypes.INTEGER, allowNull: true},
        spy: {type: DataTypes.INTEGER, allowNull: true},
        fields: {type: DataTypes.INTEGER, allowNull: true},
        blacksmith: {type: DataTypes.INTEGER, allowNull: true},
        granary: {type: DataTypes.JSON, allowNull: true},
        crop: {type: DataTypes.JSON, allowNull: true},
        administrationBuilding: {type: DataTypes.INTEGER, allowNull: true},
        headquaters: {type: DataTypes.INTEGER, allowNull: true},
        bigEagle: {type: DataTypes.INTEGER, allowNull: true},
        nest: {type: DataTypes.INTEGER, allowNull: true},
        settlers: {type: DataTypes.INTEGER, allowNull: true},
        general: {type: DataTypes.JSON, allowNull: true},
    };
    return sequelize.define('CastleIbis', attributes);
};
