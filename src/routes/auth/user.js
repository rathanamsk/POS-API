const authController = require('../../controller/auth/user');

const router = require('express').Router()


router.post('/create/user', authController.createUser)
router.get('/user', authController.getUser)


module.exports = router;