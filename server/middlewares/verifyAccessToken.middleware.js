const ApiError = require("../exeptions")
const tokenService = require("../services/token.service")

module.exports = async (req, res, next) => {

  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    const { authorization } = req.headers

    if (!authorization) {
      return next(ApiError.UnathorizedError())
    }

    const accessToken = authorization.split(' ')[1]
    if (!accessToken) {
      return next(ApiError.UnathorizedError())
    }

    const user = await tokenService.validateAccessToken(accessToken)
    if (!user) {
      return next(ApiError.UnathorizedError())
    }

    req.user = user
    next()
  } catch {
    return next(ApiError.UnathorizedError())
  }

}