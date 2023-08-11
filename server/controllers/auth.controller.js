const ApiError = require('../exeptions');
const userService = require('../services/user.service')
require('dotenv').config()
const { validationResult } = require('express-validator');
const setTokenIntoCookie = require('./helpers/setTokenIntoCookie');

class AuthController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Validation error', errors.array()))
      }
      const { password, email } = req.body;

      const userData = await userService.registration(email, password)
      setTokenIntoCookie(res, userData.refreshToken)

      res.send(userData)
    } catch (e) {
      next(e)
    }
  }

  async login(req, res, next) {
    try {
      const {email, password} = req.body
      const userData = await userService.login(email, password);
      setTokenIntoCookie(res, userData.refreshToken)

      res.send(userData)
    } catch (e) {
      next(e)
    }
  }

  async refresh(req, res, next) {
    try {
      const {refreshToken} = req.cookies;
      const userData = await userService.refresh(refreshToken);
      setTokenIntoCookie(res, userData.refreshToken)

      res.send(userData)
    } catch (e) {
      next(e)
    }
  }

  async logout(req, res, next) {
    try {
      const {refreshToken} = req.cookies;
      await userService.logout(refreshToken);
      res.clearCookie(refreshToken)
      res.status(200).send()
    } catch (e) {
      next(e)
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link
      await userService.activate(activationLink)
      return res.redirect(process.env.CLIENT_URL)
    } catch (e) {
      next(e)
    }
  }

}

module.exports = new AuthController();