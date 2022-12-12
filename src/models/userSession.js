const mongoose = require('mongoose')
const enumType = require('../common/enum')
const userSessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    token: {
        type: String,
        require: true
    },
    status: {
        type: String
    }
})

userSessionSchema.set('timestamps', {
    createdAt: "createdAt",
    updatedAt: "updatedAt"
})

module.exports = mongoose.model('UserSession', userSessionSchema)