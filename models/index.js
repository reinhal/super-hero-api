const Sequelize = require('sequelize')
const heroesModel = require('./heroes')

const connection = new Sequelize('heroes', 'heroes', '$up3rH3r03$', {
  host: 'localhost', dialect: 'mysql'
})

const heroes = heroesModel(connection, Sequelize)

module.exports = { heroes }
