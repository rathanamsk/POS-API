const category = require('../controller/categoies');

const router = require('express').Router()


router.post('/category', category.cerateCategories)
router.get('/category', category.getAllCategories)
router.delete('/category/(:id)', category.deleteCategories)
router.put('/category/(:id)', category.updateCategories)

module.exports = router;