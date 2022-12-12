const mongoose = require('mongoose')

const storeSchema = new mongoose.Schema({
    storeName: {
        type: String
    },
    storeImage: {
        type: String
    },
    storeLocation: {
        type: String
    },
    paymentQR: {
        type: String
    }
})
storeSchema.set('timestamps', {
    createdAt: "createdAt",
    updatedAt: "updatedAt"
})

module.exports = mongoose.model('Store', storeSchema)