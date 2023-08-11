const sequelize = require('./db')
const {UserModel, TokenModel} = require('./relation')


module.exports = {sequelize, UserModel, TokenModel}