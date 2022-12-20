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
        type: String,
        default: "https://firebasestorage.googleapis.com/v0/b/pos-storage-a40e8.appspot.com/o/profile%2Fprofile.png?alt=media&token=881245f8-d34e-4844-90bd-1078a2c2ffb2"
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