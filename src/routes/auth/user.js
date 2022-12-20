const authController = require('../../controller/auth/user');

const router = require('express').Router()

const upload = require('multer')()

router.post('/create/user', authController.createUser)
router.get('/user', authController.getUser)
router.put('/profile', upload.single('profile'), authController.updateProfile)
router.put('/store', upload.single('storeImage'), authController.updateStore)
router.put('/changepassword', authController.changePassword)
module.exports = router;