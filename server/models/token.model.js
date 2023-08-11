const sequelize = require("./db")
const {DataTypes} = require("sequelize")

const TokenModel = sequelize.define('token', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    refreshToken: {type: DataTypes.TEXT, require: true}
})

module.exports = TokenModel