const config = require('../config')

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(config.db.development)

const testDbConnection = async () => {
    try {
        sequelize
            .authenticate()
            .then(async () => {
                console.log('Connection has been established successfully.')
                await sequelize.sync({ force: true })
                    .then(() => {
                        console.log("All models were synchronized successfully.")
                    });
            })
            .catch((error) => {
                console.error(`Unable to connect to the database: ${error.message}`)
            });
    } catch (e) {
        console.error("Unable to connect to the database:", error);
    }
}

module.exports = { sq: sequelize, testDbConnection };