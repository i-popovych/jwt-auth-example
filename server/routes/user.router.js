const router = require('express').Router();
const UserController = require('../controllers/user.controller')
const verifyAccessToken = require('../middlewares/verifyAccessToken.middleware')

router.get('/', verifyAccessToken, UserController.getUsers)

module.exports = router;