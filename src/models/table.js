const mongoose = require('mongoose')
const enumType = require('../common/enum')
const tableSchema = new mongoose.Schema({
    storeId: {
        type: mongoose.Schema.ObjectId,
        ref: "Store"
    },
    tableNumber: {
        type: Number,
        default: "NaN"
    },
    tableName: {
        type: String,
        default: "NaN"
    },
    chairs: {
        type: Number,
        default: "NaN"
    },
    status: {
        type: String
    }
})
tableSchema.set('timestamps', {
    createdAt: "createdAt",
    updatedAt: "updatedAt"
})
module.exports = mongoose.model('Table', tableSchema);