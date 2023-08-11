const {UserModel, TokenModel} = require('../models')
const bcrypt = require('bcrypt');
const uuid = require('uuid')
const mailService = require('./mail.service')
const tokenService = require('./token.service')
const UserDto = require('../dtos/user.dto');
const ApiError = require('../exeptions');
require('dotenv').config()
const checkFieldExist = require('./helpers/checkFieldExist')
const createTokens = require('./helpers/createTokens')

class UserService {
  async registration(email, password) {
    await checkFieldExist(UserModel, {email}, false, `User with ${email} is already exist`)

    const hashPass = await bcrypt.hash(password, 4);
    const activationLink = uuid.v4();
    const user = await UserModel.create({email, password: hashPass, activationLink})
    await mailService.sendActivationMail(email, `${process.env.API_URL}/api/auth/activate/${activationLink}`)

    const userDto = new UserDto(user)
    const tokens = await createTokens(tokenService, userDto)

    return {...tokens, user: userDto}
  }

  async login(email, password) {
    await checkFieldExist(UserModel, {email}, true, `User with ${email} is not exist`)

    const user = await UserModel.findOne({where: {email}})
    const isPassEquals = await bcrypt.compare(password, user.password)

    if (!isPassEquals) {
      throw ApiError.BadRequest('Wrong password')
    }

    const userDto = new UserDto(user)
    const tokens = await createTokens(tokenService, userDto)

    return {...tokens, user: userDto}
  }

  async activate(activationLink) {
    await checkFieldExist(UserModel, {activationLink}, true, 'Activation link is not valid')
    const user = await UserModel.findOne({where: {activationLink}})
    user.isActivated = true
    await user.save()
  }

  async logout(refreshToken) {
     await tokenService.removeRefreshToken(refreshToken);
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnathorizedError()
    }

    const userData = await tokenService.validateRefreshToken(refreshToken)
    const isBdHaveRefreshToken = await TokenModel.findOne({ where: {refreshToken} })

    if (!userData || !isBdHaveRefreshToken) {
      throw ApiError.UnathorizedError()
    }

    const user = await UserModel.findByPk(userData.id)
    const userDto = new UserDto(user)
    const tokens = await createTokens(tokenService, userDto)

    return {...tokens, user: userDto}
  }

  async getUsers() {
    return await UserModel.findAll();
  }
}

module.exports = new UserService()