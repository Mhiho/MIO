const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        castleHernID: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
        foodRateBonus: {type: DataTypes.DECIMAL, allowNull: true},
        magicRateBonus: {type: DataTypes.DECIMAL, allowNull: true},
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
        granary: {type: DataTypes.JSON, allowNull: true},
        dragon: {type: DataTypes.INTEGER, allowNull: true},
        administrationBuilding: {type: DataTypes.INTEGER, allowNull: true},
        headquaters: {type: DataTypes.INTEGER, allowNull: true},
        elephantus: {type: DataTypes.INTEGER, allowNull: true},
        madDog: {type: DataTypes.INTEGER, allowNull: true},
        general: {type: DataTypes.INTEGER, allowNull: true}
    };

    return sequelize.define('CastleHern', attributes);
}