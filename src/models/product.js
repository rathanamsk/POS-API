const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    categoriesId: {
        type: mongoose.Schema.ObjectId,
        ref: "Categories"
    },
    productName: {
        type: String
    },
    productImage: {
        type: String
    },
    quantity: {
        type: Number
    },
    price: {
        type: Number
    },
    status: {
        type: String
    }
})
productSchema.set('timestamps', {
    createdAt: "createdAt",
    updatedAt: "updatedAt"
})

module.exports = mongoose.model('Product', productSchema);