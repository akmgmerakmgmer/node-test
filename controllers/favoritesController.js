const Product = require('../models/productModel')
const Favorites = require('../models/favoriteModel')

const post_favorite = (req, res, next) => {
    Favorites.create(req.body).then(response => {
        Product.findByIdAndUpdate({ _id: req.body.product }, { $set: { isFavorite: true, favoritesId: response._id } }).then(product => {
            Product.findOne({ _id: req.body.product }).then(newProduct => {
                res.status(200).send(newProduct)
            })
        }).catch(next)
    }).catch(next)
}
const get_favorites = (req, res, next) => {
    const page = req.query.page - 1 || 0
    const per_page = 8
    Favorites.find({}).count().then(total_products => {
        Product.find({isFavorite:{$in:[true]}}).skip(page * per_page).limit(per_page).populate('category').populate('subcategory').populate('brand').then(product => {
            res.status(200).send({ product, total_products, per_page })
        }).catch(next)
    })

}

const delete_favorite = (req, res, next) => {
    Favorites.findByIdAndRemove({ _id: req.params.id }).then(product => {
        Product.findByIdAndUpdate({ _id: product.product._id }, { $set: { isFavorite: false, favoritesId: '' } }).then(product => {
        }).catch(next)
        res.status(200).send(product)
    }).catch(next)
}

module.exports = { get_favorites, post_favorite, delete_favorite }