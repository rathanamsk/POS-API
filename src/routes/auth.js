const auth = require('../controller/auth');

const router = require('express').Router()


router.post('/signup', auth.signup)

module.exports = router;