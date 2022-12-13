const category = require('../controller/categoies');

const router = require('express').Router()


router.post('/create-category', category.cerateCategories)
router.get('/create-category', category.getAllCategories)
router.delete('/create-category/(:id)', category.deleteCategories)
router.put('/create-category/(:id)', category.updateCategories)

module.exports = router;