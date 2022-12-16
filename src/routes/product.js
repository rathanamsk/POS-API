const product = require('../controller/product');
const router = require('express').Router()
router.post('/product', product.cerateProduct)
router.get('/product', product.getAllProduct)
router.delete('/product/(:id)', product.deleteProduct)
router.put('/product/(:id)', product.updateProduct)
router.get("/product",product.searchProduct)

module.exports = router;