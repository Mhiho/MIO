const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        villageWildID: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
        name: {type: DataTypes.STRING, allowNull: true},
        foodRateBonus: {type: DataTypes.DECIMAL, allowNull: true},
        ironRateBonus: {type: DataTypes.DECIMAL, allowNull: true},
        stoneRateBonus: {type: DataTypes.DECIMAL, allowNull: true},
        silverRateBonus: {type: DataTypes.DECIMAL, allowNull: true},
        magicRateBonus: {type: DataTypes.DECIMAL, allowNull: true},
        woodRateBonus: {type: DataTypes.DECIMAL, allowNull: true},
        foodStart: {type: DataTypes.INTEGER, allowNull: true},
        ironStart: {type: DataTypes.INTEGER, allowNull: true},
        stoneStart: {type: DataTypes.INTEGER, allowNull: true},
        woodStart: {type: DataTypes.INTEGER, allowNull: true},
        silverStart: {type: DataTypes.INTEGER, allowNull: true},
        magicStart: {type: DataTypes.INTEGER, allowNull: true},
        headless: {type: DataTypes.INTEGER, allowNull: true},
        blackGuard: {type: DataTypes.INTEGER, allowNull: true},
        shaman: {type: DataTypes.INTEGER, allowNull: true},
        wildSoldier: {type: DataTypes.INTEGER, allowNull: true},
        ramWild: {type: DataTypes.INTEGER, allowNull: true},
        gigantWild: {type: DataTypes.INTEGER, allowNull: true},
        blindGuild: {type: DataTypes.INTEGER, allowNull: true},
        dragonCave: {type: DataTypes.INTEGER, allowNull: true},
        magicCauldron: {type: DataTypes.INTEGER, allowNull: true},
        blindEye: {type: DataTypes.INTEGER, allowNull: true},
        hides: {type: DataTypes.INTEGER, allowNull: true},
        hunters: {type: DataTypes.JSON, allowNull: true},
        workshop: {type: DataTypes.INTEGER, allowNull: true},
        fortifications: {type: DataTypes.INTEGER, allowNull: true},
        blacksmith: {type: DataTypes.INTEGER, allowNull: true},
        fields: {type: DataTypes.INTEGER, allowNull: true},
        ironMine: {type: DataTypes.JSON, allowNull: true},
        forest: {type: DataTypes.JSON, allowNull: true},
        stoneMine: {type: DataTypes.JSON, allowNull: true},
        silverMine: {type: DataTypes.JSON, allowNull: true},
        granary: {type: DataTypes.JSON, allowNull: true},
        warehouse: {type: DataTypes.JSON, allowNull: true},
        dragon: {type: DataTypes.INTEGER, allowNull: true},
        administrationBuilding: {type: DataTypes.INTEGER, allowNull: true},
        headquaters: {type: DataTypes.INTEGER, allowNull: true},
        elephantus: {type: DataTypes.INTEGER, allowNull: true},
        madDog: {type: DataTypes.INTEGER, allowNull: true},
        settlers: {type: DataTypes.INTEGER, allowNull: true},
    };



    return sequelize.define('VillageWild', attributes);
}