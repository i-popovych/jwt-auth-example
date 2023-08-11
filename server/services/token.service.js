const jwt = require('jsonwebtoken')
require('dotenv').config()
const {TokenModel} = require('../models')


class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: '10s'})
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY, {expiresIn: '15m'})

    return {accessToken, refreshToken}
  }

  async saveToken (userId, refreshToken) {
    const tokenData = await TokenModel.findOne({ where: {userId} })
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }

    const token = await TokenModel.create({userId, refreshToken})
  }

  async removeRefreshToken(refreshToken) {
    const a = await TokenModel.destroy({ where: {refreshToken} })
    return a;
  }

  async validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_SECRET_KEY)
      return userData
    } catch {
      return null
    }
  }

  async validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET_KEY)
      return userData
    } catch {
      return null
    }
  }
}

module.exports = new TokenService()