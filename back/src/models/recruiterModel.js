const { sq } = require('./index');
const { DataTypes } = require('sequelize');

const Recruiter = sq.define('recruiter', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    name: DataTypes.STRING,
    linkedin_headline: DataTypes.STRING,
    position: DataTypes.STRING,
    company_name: DataTypes.STRING,
    public_url: DataTypes.STRING,
    picture_url: DataTypes.STRING,
    employer_website: DataTypes.STRING
}, {
    modelName: 'Recruiter',
    timestamps: true,
    freezeTableName: true
});

Recruiter
    .sync()
    .then(() => {
        console.log('Recruiter Model synced');
    });

module.exports = Recruiter;
