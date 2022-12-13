const mongoose = require('mongoose');
const enumType = require('../common/enum')

const userSchema = new mongoose.Schema({
    storeId: {
        type: mongoose.Schema.ObjectId,
        ref: "Store"
    },
    username: {
        type: String
    },
    email: {
        type: String
    },
    role: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    password: {
        type: String,
        require: true
    },
    profile: {
        type: String
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }
})

userSchema.set('timestamps', {
    createdAt: "createdAt",
    updatedAt: "updatedAt"
})

module.exports = mongoose.model('User', userSchema)