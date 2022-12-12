const mongoose = require('mongoose')
const enumType = require('../common/enum')
const tableSchema = new mongoose.Schema({
    tableNumber: {
        type: Number
    },
    tableName: {
        type: String
    },
    chairs: {
        type: Number
    },
    status: {
        type: enumType.tableStatus
    }
})

tableSchema.set('timestamps', {
    createdAt: "createdAt",
    updatedAt: "updatedAt"
})

module.exports = mongoose.model('Table', tableSchema);