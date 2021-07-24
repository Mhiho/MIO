const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        userID: {type: DataTypes.INTEGER, primaryKey: true, allowNull: true, autoIncrement: true},
        name: { type: DataTypes.STRING, allowNull: true },
        passwordHash: { type: DataTypes.STRING, allowNull: true },
        email: { type: DataTypes.STRING, allowNull: true},
        race: { type: DataTypes.ENUM('0','1','2'), allowNull: true},
        kind: { type: DataTypes.ENUM('0','1','2'), allowNull: true},
        character: { type: DataTypes.ENUM('0','1','2'), allowNull: true},
        cameFrom: { type: DataTypes.ENUM('0','1','2'), allowNull: true},
        bestWeapon: { type: DataTypes.ENUM('0','1','2'), allowNull: true},
        bio: { type: DataTypes.STRING, allowNull: true},
        ownVillagesArray: { type: DataTypes.JSON, allowNull: true},
        ownCastlesArray: { type: DataTypes.JSON, allowNull: true},
        joinAt: { type: DataTypes.DATE, allowNull: true},
        alliance: { type: DataTypes.STRING, allowNull: true},
        active: { type: DataTypes.BOOLEAN, allowNull: true},
        dragonCrystals: { type: DataTypes.INTEGER, allowNull: true},
        unofficialFriends: { type: DataTypes.JSON, allowNull: true},
        chatsWith: { type: DataTypes.JSON, allowNull: true},
        rank: { type: DataTypes.INTEGER, allowNull: true},
        positionX: { type: DataTypes.INTEGER, allowNull: true},
        positionY: { type: DataTypes.INTEGER, allowNull: true},
        whisperingTitle: { type: DataTypes.STRING, allowNull: true },
        tokens: { type: DataTypes.JSON, allowNull: true, defaultValue: [] },
    };

    const options = {
        defaultScope: {
            // exclude hash by default
            attributes: { exclude: ['passwordHash', 'userID', 'tokens'] }
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }
    };

    return sequelize.define('User', attributes, options);
}