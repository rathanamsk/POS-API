const product = require('../controller/product');
const router = require('express').Router()
const upload = require('multer')();

router.post('/product', upload.single('file'), product.cerateProduct)
router.get('/product', product.getAllProduct)
router.delete('/product/(:id)', product.deleteProduct)
router.put('/product/(:id)', product.updateProduct)
router.get("/product/search",product.searchProduct)

module.exports = router;