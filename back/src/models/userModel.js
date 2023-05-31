const { sq } = require('./index');
const { DataTypes } = require('sequelize');

const User = sq.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: DataTypes.TEXT,
    skills: DataTypes.TEXT,
    englishLevel: DataTypes.TEXT,
    degree: DataTypes.TEXT,
    location: DataTypes.TEXT,
    desiredSalary: DataTypes.TEXT,
    experience: DataTypes.TEXT,
}, {
    modelName: 'User',
    timestamps: true,
    freezeTableName: true
});

User
    .sync()
    .then(() => {
        console.log('User Model synced');
    });

module.exports = User;
