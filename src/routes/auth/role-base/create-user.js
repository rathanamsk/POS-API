
const router = require('express').Router()

const authController = require('../../../controller/auth/user')

router.post('/create/user', authController.createUser)


module.exports = router;