const table = require('../controller/table');
const router = require('express').Router()
router.post('/table', table.createTable)
router.get('/table', table.getAllTable)
router.delete('/table/(:id)', table.deleteTable)
router.put('/table/(:id)', table.updateTable)
router.get('/table-available'.table.getAllAvailableTable)

module.exports = router;