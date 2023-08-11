const TokenModel = require('./token.model')
const UserModel = require('./user.model')

UserModel.hasOne(TokenModel)
TokenModel.belongsTo(UserModel)

module.exports = {UserModel,TokenModel}