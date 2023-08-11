const sequelize = require("./db")
const {DataTypes} = require("sequelize")

const UserModel = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true, require: true, notNull: true},
    password: {type: DataTypes.STRING, require: true, notNull: true},
    isActivated: {type: DataTypes.BOOLEAN, defaultValue: false},
    activationLink: {type: DataTypes.STRING}
})

module.exports = UserModel