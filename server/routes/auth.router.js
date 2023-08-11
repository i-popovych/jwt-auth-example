const router = require('express').Router()
const authController = require('../controllers/auth.controller')
const { body } = require('express-validator')

router.post('/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 4, max: 15 }),
  authController.registration)
router.post('/login', authController.login)
router.post('/logout', authController.logout)
router.get('/activate/:link', authController.activate)
router.get('/refresh', authController.refresh)

module.exports = router