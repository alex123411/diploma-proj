require('dotenv').config()

const config = {
  port: process.env.EXPOSE_PORT || 3000,
  db: {
    development: {
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      host: process.env.MYSQL_HOST,
      dialect: 'mysql',
    },
  }
}

module.exports = config