const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BrandSchema = new Schema({
    name:{
        type:String,
        required:[true,'field_required']
    },
    products:{
        type:Schema.Types.ObjectId,
        ref:'product'
    },
    description:{
        type:String
    },
    image:{
        type:String,
        default:'http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back05.jpg'
    }
},{
    timestamps:true
})

const Brand = mongoose.model('brand', BrandSchema)
module.exports = Brand