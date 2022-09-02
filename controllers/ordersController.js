const Order = require('../models/ordersModel')
const User = require('../models/userModel')
const Product = require('../models/productModel')

const getProductStock = (variations, chosenColor, chosenSize) => {
    if (variations.length > 0) {
        for (let i = 0; i < variations.length; i++) {
            if (variations[i].color === chosenColor && variations[i].size === chosenSize) {
                return variations[i].stock
            }
        }
    }
}

const create_order = (req, res, next) => {
    User.findById({ _id: req.body.user }).populate({ path: "cart", populate: { path: "items", populate: "product" } }).then(user => {
        const userCartItems = user.cart.items
        for (let i = 0; i < userCartItems.length; i++) {
            Product.findById({ _id: userCartItems[i].product._id }).then(product => {
                if (getProductStock(product.variations, product.chosenColor, product.chosenSize) < userCartItems[i].quantity) {
                    res.status(400).send({ message: 'quantity_larger_than_stock' })
                    return;
                }
                if (product.variations.length === 0) {
                    if (product.stock < userCartItems[i].quantity) {
                        res.status(400).send({ message: 'quantity_larger_than_stock' })
                        return;
                    }
                }
            }).catch(next)
        }
        Order.create(req.body).then(order => {
            for (let i = 0; i < userCartItems.length; i++) {
                //Minus the quantity of the variations
                if (userCartItems[i].product.variations.length > 0) {
                    let newVariations = userCartItems[i].product.variations
                    for (let j = 0; j < userCartItems[i].product.variations.length; j++) {
                        if (userCartItems[i].product.variations[j].color === userCartItems[i].chosenColor && userCartItems[i].product.variations[j].size === userCartItems[i].chosenSize) {
                            
                            newVariations[j].stock = userCartItems[i].product.variations[j].stock - userCartItems[i].quantity
                            Product.findByIdAndUpdate({ _id: userCartItems[i].product._id }, { $set: { variations: newVariations, items_ordered: userCartItems[i].product.items_ordered + 1 } }).then(product => {

                            }).catch(next)
                        }
                    }
                }
                // Minus the quantity without variations
                if (userCartItems[i].product.variations.length === 0) {
                    let newStock = userCartItems[i].product.stock - userCartItems[i].quantity
                    Product.findByIdAndUpdate({ _id: userCartItems[i].product._id }, { $set: { stock: newStock, items_ordered: userCartItems[i].product.items_ordered + 1 } }).then(product => {

                    }).catch(next)
                }
            }
            let newOrder = user
            newOrder.cart.items = []
            newOrder.cart.total_price = 0
            newOrder.cart.total_discount = 0
            User.findByIdAndUpdate({ _id: req.body.user }, newOrder).then(order => {
            }).catch(next)
            User.findByIdAndUpdate({ _id: req.body.user }, {$push:{orders:order}}).then(order => {
            }).catch(next)
            res.status(200).send(order)
        }).catch(next)
    }).catch(next)
}

const get_all_orders = (req, res, next) => {
    Order.find({}).then(order => res.status(200).send(order)).catch(next)
}

const get_single_order = (req, res, next) => {
    Order.findById({ _id: req.params.id }).then(order => res.status(200).send(order)).catch(next)
}

const delete_order = (req, res, next) => {
    Order.findByIdAndDelete({ _id: req.params.id }).then(order => res.status(200).send(order)).catch(next)
}

const update_order = (req, res, next) => {
    Order.findByIdAndUpdate({ _id: req.params.id }, req.body).then(prevOrder => {
        Order.findOne({ _id: req.params.id }).then(newOrder => {
            res.status(200).send(newOrder)
        })
    }).catch(next)
}

module.exports = { create_order, get_all_orders, get_single_order, update_order, delete_order }