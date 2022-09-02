const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SubcategorySchema = new Schema({
    name:{
        type:String,
        required:[true,'field_required'],
    },
    nameAr:{
        type:String,
        required:[true,'field_required'],
    },
    products:{
        type:[Schema.Types.ObjectId],
        ref:'product'
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:'category',
        required:[true,'field_required']
    },
    image:{
        type:String,
        default:'http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back05.jpg'
    },
    description:{
        type:String,
        default:""
    },
    descriptionAr:{
        type:String,
        default:""
    }

},{
    timestamps:true
})


const Subcategory = mongoose.model('subcategory', SubcategorySchema)
module.exports = Subcategory