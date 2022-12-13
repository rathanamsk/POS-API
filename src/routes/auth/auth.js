const authController = require('../../controller/auth/auth');

const router = require('express').Router()


router.post('/signup', authController.signup)
router.post('/login',authController.login)
router.delete('/logout', authController.logout)

module.exports = router;