const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CartModel = new Schema({
    items: [

        {
            product: {
                type: Schema.Types.ObjectId,
                ref: 'product'
            },
            quantity: {
                type: Number,
                required: true
            }
        }

    ],
    total_price: {
        type: Number,
        default: 0
    },
    total_discount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})


const Cart = mongoose.model('cart', CartModel)
module.exports = Cart