const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        castleHernID: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
        foodRateBonus: {type: DataTypes.DECIMAL, allowNull: true},
        magicRateBonus: {type: DataTypes.DECIMAL, allowNull: true},
        hunters: {type: DataTypes.JSON, allowNull: true},
        fields: {type: DataTypes.INTEGER, allowNull: true},
        militia: {type: DataTypes.INTEGER, allowNull: true},
        hern: {type: DataTypes.INTEGER, allowNull: true},
        gryfHern: {type: DataTypes.INTEGER, allowNull: true},
        magicHern: {type: DataTypes.INTEGER, allowNull: true},
        horseHern: {type: DataTypes.INTEGER, allowNull: true},
        ramHern: {type: DataTypes.INTEGER, allowNull: true},
        balistaHern: {type: DataTypes.INTEGER, allowNull: true},
        barracks: {type: DataTypes.INTEGER, allowNull: true},
        slave: {type: DataTypes.INTEGER, allowNull: true},
        clifs: {type: DataTypes.INTEGER, allowNull: true},
        magicFire: {type: DataTypes.INTEGER, allowNull: true},
        stables: {type: DataTypes.INTEGER, allowNull: true},
        workshop: {type: DataTypes.INTEGER, allowNull: true},
        fortifications: {type: DataTypes.JSON, allowNull: true},
        blacksmith: {type: DataTypes.INTEGER, allowNull: true},
        granary: {type: DataTypes.JSON, allowNull: true},
        administrationBuilding: {type: DataTypes.INTEGER, allowNull: true},
        headquaters: {type: DataTypes.INTEGER, allowNull: true},
        oldHern: {type: DataTypes.INTEGER, allowNull: true},
        scoutHern: {type: DataTypes.INTEGER, allowNull: true},
        general: {type: DataTypes.INTEGER, allowNull: true}
    };

    return sequelize.define('CastleHern', attributes);
}