const dailySell = require('../controller/dailySell');
const router = require('express').Router()
router.post('/dailySell', dailySell.createSale)
router.get('/dailySell', dailySell.getAllSale)
router.delete('/dailySell/(:id)', dailySell.deleteSale)
router.put('/dailySell/(:id)', dailySell.updateSale)
router.get('/dailySell-available',dailySell.getAllAvailableSale)
router.post('/dailySell/confirm_payment/(:id)',dailySell.confirmPayment)
router.get('/dailySell/order/(:id)', dailySell.getOrderTable)

module.exports = router;