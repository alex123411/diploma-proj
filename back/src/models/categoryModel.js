const { sq } = require('./index');
const { DataTypes } = require('sequelize');

const Category = sq.define('categories', {
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
    },
}, {
    modelName: 'Category',
    timestamps: true,
    freezeTableName: true
});

Category
    .sync()
    .then(() => {
        console.log('Category Model synced');
    });

module.exports = Category;
