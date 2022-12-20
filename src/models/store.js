const mongoose = require('mongoose')

const storeSchema = new mongoose.Schema({
    storeName: {
        type: String
    },
    storeImage: {
        type: String,
        default: "https://firebasestorage.googleapis.com/v0/b/pos-storage-a40e8.appspot.com/o/store%2Fimages.png?alt=media&token=bd165ae3-f234-4c4c-a9b0-53e3f75af311"
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