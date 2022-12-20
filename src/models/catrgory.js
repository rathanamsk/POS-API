const mongoose = require("mongoose");
const enumType = require('../common/enum')

const categoriesSchema = new mongoose.Schema({
    categoriesName: {
        type: String
    },
    status: {
        type: String
    }
})
categoriesSchema.set('timestamps', {
    createdAt: "createdAt",
    updatedAt: "updatedAt"
})

module.exports = mongoose.model('Categories', categoriesSchema);