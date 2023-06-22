const { sq } = require('./index');
const { DataTypes } = require('sequelize');
const User = require('./userModel');

const UserRequest = sq.define('user_request', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: "id"
        }
    },
    query: {
        type: DataTypes.STRING,
        allowNull: false
    },
    stats: {
        type: DataTypes.TEXT(100000),
        allowNull: false,
    }
}, {
    modelName: 'UserRequest',
    timestamps: true,
    freezeTableName: true
});

UserRequest.hasMany(User, {
    foreignKey: 'id'
});

UserRequest
    .sync()
    .then(() => {
        console.log('UserRequest Model synced');
    });

module.exports = UserRequest;
