const auth = require('../controller/auth');

const router = require('express').Router()


router.post('/signup', auth.signup)
router.post('/login',auth.login)


module.exports = router;