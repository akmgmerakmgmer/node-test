const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FavoriteSchema = new Schema({
    product:{
        type:Schema.Types.ObjectId,
        ref:'product',
    },
})

const Favorites = mongoose.model('favorite', FavoriteSchema)
module.exports = Favorites