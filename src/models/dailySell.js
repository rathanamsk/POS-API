const mongoose = require('mongoose')
const enumType = require('../common/enum')

const dailySellSchema = new mongoose.Schema({
    tableId: {
        type: mongoose.Schema.ObjectId,
        ref: "Table"
    },
    productId: {
        type: mongoose.Schema.ObjectId,
        ref: "Product"
    },
    quantity: {
        type: Number
    },
    status: {
        type: String
    }
})

dailySellSchema.set('timestamps', {
    createdAt: "createdAt",
    updatedAt: "updatedAt"
})

module.exports = mongoose.model('DailySell', dailySellSchema)