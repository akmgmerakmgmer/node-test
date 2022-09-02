const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    name: {
        type: String,
        required: [true, "field_required"]
    },
    nameAr: {
        type: String,
        required: [true, "field_required"]
    },
    description: {
        type: String,
        required: [true, "field_required"]
    },
    descriptionAr: {
        type: String,
        required: [true, "field_required"]
    },
    images: {
        type: [String],
        default: ['http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back05.jpg', 'http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back05.jpg', 'http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back05.jpg']
    },
    price: {
        type: Number,
        required: [true, "field_required"]
    },
    discount: {
        type: Number,
        default: 0
    },
    stock: {
        type: Number,
        required: [true, "field_required"]
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: [true, 'category_required']
    },
    subcategory: {
        type: Schema.Types.ObjectId,
        ref: 'subcategory',
        required: [true, 'field_required']
    },
    brand: {
        type: Schema.Types.ObjectId,
        ref: 'brand',
    },
    variations: [
        {
            color: {
                type: String,
                default: "default"
            },
            size: {
                type: String,
                default: "default"
            },
            stock: {
                type: Number,
                required:[true,'field_required']
            },
            price: {
                type: Number,
                required:[true,'field_required']
            },
            discount: {
                type: Number,
                default: 0
            }
        }
    ],
    seller: {
        type: String
    },
    items_ordered: {
        type: Number,
        default: 0
    },
    isFavorite: {
        type: Boolean,
        default: false
    },
    favoritesId: {
        type: String,
    }
}, {
    timestamps: true
})

const Product = mongoose.model('product', ProductSchema)
module.exports = Product