const { sq } = require('./index');
const { DataTypes } = require('sequelize');

const EnglishLevel = sq.define('english_level', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }

}, {
    modelName: 'EnglishLevel',
    timestamps: true,
    freezeTableName: true
});

EnglishLevel
    .sync()
    .then(() => {
        console.log('EnglishLevel Model synced');
    });

module.exports = EnglishLevel;
