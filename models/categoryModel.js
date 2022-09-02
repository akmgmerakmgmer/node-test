const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
    name:{
        type:String,
        required:[true,"field_required"]
    },
    nameAr:{
        type:String,
        required:[true,"field_required"]
    },
    subcategory:{
        type:[Schema.Types.ObjectId],
        ref:'subcategory'
    },
    products:{
        type:[Schema.Types.ObjectId],
        ref:'product'
    },
    description:{
        type:String,
        default:''
    },
    descriptionAr:{
        type:String,
        default:''
    },
    image:{
        type:String,
        default:'http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back05.jpg'
    }
},{
    timestamps:true
})

const Category = mongoose.model('category', CategorySchema)
module.exports = Category