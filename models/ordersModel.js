const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrdersSchema = new Schema({
    cart: {
        type: Object
    },
    status: {
        type: String,
        default: "Pending"
    },
    userInfo: {
        name: {
            type: String
        },
        number: {
            type: Number
        },
        governorate: {
            type: Object,
        },
        city: {
            type: Object
        },
        detailedAddress: {
            type: String
        },
        note: {
            type: String
        }
        // street: {
        //     type: String,
        //     // required:[true,'field_required']
        // },
        // building: {
        //     type: String,
        //     // required:[true,'field_required']
        // },
        // apartment: {
        //     type: String,
        //     // required:[true,'field_required']
        // }
    },
}, {
    timestamps: true
})

const Order = mongoose.model('order', OrdersSchema)
module.exports = Order