const { sq } = require('./index');
const { DataTypes } = require('sequelize');

const Category = require('./categoryModel');
const EnglishLevel = require('./englishLevelModel');
const Recruiter = require('./recruiterModel');

const Job = sq.define('job', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    title: DataTypes.STRING,
    slug: DataTypes.STRING,
    company_name: DataTypes.STRING,
    long_description: DataTypes.STRING,

    categoryId: {
        type: DataTypes.STRING,
        references: {
            model: Category,
            key: "id"
        }
    },

    location: DataTypes.STRING,
    experience: DataTypes.INTEGER,

    englishLevelId: {
        type: DataTypes.STRING,
        references: {
            model: EnglishLevel,
            key: "id"
        }
    },

    domain: DataTypes.STRING,
    published: DataTypes.STRING,

    recruiterId: {
        type: DataTypes.INTEGER,
        references: {
            model: Recruiter,
            key: "id"
        }
    },

    views_count: DataTypes.INTEGER,
    applications_count: DataTypes.INTEGER,
    public_salary_min: DataTypes.INTEGER,
    public_salary_max: DataTypes.INTEGER,
    is_parttime: DataTypes.BOOLEAN,
    has_test: DataTypes.BOOLEAN,
    is_ukraine_only: DataTypes.BOOLEAN

}, {
    modelName: 'Job',
    timestamps: true,
    freezeTableName: true
});

Job.belongsTo(Recruiter)
Job.belongsTo(Category)
Job.belongsTo(EnglishLevel)

Job
    .sync()
    .then(() => {
        console.log('Job Model synced');
    });

module.exports = Job;
