const User = require('../models/userModel')
const Product = require('../models/productModel')

const calculateTotalCartPrice = (items) => {
    let totalAmount = 0
    for (let i = 0; i < items.length; i++) {
        totalAmount += items[i].price * items[i].quantity
    }
    return totalAmount
}
const calculateTotalCartDiscount = (items) => {
    let totalAmount = 0
    for (let i = 0; i < items.length; i++) {
        totalAmount += items[i].discount * items[i].quantity
    }
    return totalAmount
}

const getProductStock = (variations, chosenColor, chosenSize) => {
    if (variations.length > 0) {
        for (let i = 0; i < variations.length; i++) {
            if (variations[i].color === chosenColor && variations[i].size === chosenSize) {
                return variations[i].stock
            }
        }
    }
}
const checkIfVariationExists = (variations, chosenColor, chosenSize) => {
    if (variations.length > 0) {
        for (let i = 0; i < variations.length; i++) {
            if (variations[i].color === chosenColor && variations[i].size === chosenSize) {
                return true
            }
        }
        return false
    }
}
const create_cart = (req, res, next) => {
    User.findByIdAndUpdate({ _id: req.params.id }, { chosenColor: req.body.chosenColor, chosenSize: req.body.chosenSize, price: req.body.price, discount: req.body.discount }).populate({ path: "cart", populate: { path: "items", populate: "product" } }).then((user) => {
        Product.findById({ _id: req.body.product }).then(product => {
            if (getProductStock(product.variations, req.body.chosenColor, req.body.chosenSize) < req.body.quantity) {
                res.status(400).send({ message: 'quantity_larger_than_stock' })
                return;
            }
            if (checkIfVariationExists(product.variations, req.body.chosenColor, req.body.chosenSize) === false) {
                res.status(400).send({ message: 'quantity_larger_than_stock' })
                return;
            }
            let currentUser = user

            for (let i = 0; i < user.cart.items.length; i++) {
                // Check if Variation Exists
                if (user.cart.items[i].product._id.toString() === req.body.product.toString() && user.cart.items[i].product.variations.length === 0) {
                    currentUser.cart.items[i].quantity = parseInt(currentUser.cart.items[i].quantity) + parseInt(req.body.quantity)

                    if (currentUser.cart.items[i].product.stock < currentUser.cart.items[i].quantity) {
                        res.status(400).send({ message: 'quantity_larger_than_stock' })
                        return;
                    }
                    currentUser.cart.total_price = calculateTotalCartPrice(currentUser.cart.items)
                    currentUser.cart.total_discount = calculateTotalCartDiscount(currentUser.cart.items)
                    User.findByIdAndUpdate({ _id: req.params.id }, currentUser).then(quantityUser => {
                        User.findOne({ _id: req.params.id }).populate({ path: "cart", populate: { path: "items", populate: "product" } }).then(newUser => {
                            res.status(200).send(newUser)
                        })
                    }).catch(next)
                    return;
                }
                //Check if size and color matches the variations that is existing

                if (user.cart.items[i].product.variations.length > 0) {
                    if (user.cart.items[i].product._id.toString() === req.body.product.toString() && user.cart.items[i].chosenColor === req.body.chosenColor && user.cart.items[i].chosenSize === req.body.chosenSize && (req.body.chosenColor !== "default" || req.body.chosenSize !== "default")) {
                        currentUser.cart.items[i].quantity = parseInt(currentUser.cart.items[i].quantity) + parseInt(req.body.quantity)
                        let variationStock = currentUser.cart.items[i].product.variations.filter(variation => variation.color === req.body.chosenColor && variation.size === req.body.chosenSize)[0].stock
                        if (variationStock < currentUser.cart.items[i].quantity) {
                            res.status(400).send({ message: 'quantity_larger_than_stock' })
                            return;
                        }
                        currentUser.cart.total_price = calculateTotalCartPrice(currentUser.cart.items)
                        currentUser.cart.total_discount = calculateTotalCartDiscount(currentUser.cart.items)
                        User.findByIdAndUpdate({ _id: req.params.id }, currentUser).then(quantityUser => {
                            User.findOne({ _id: req.params.id }).populate({ path: "cart", populate: { path: "items", populate: "product" } }).then(newUser => {
                                res.status(200).send(newUser)
                            })
                        }).catch(next)
                        return;
                    }
                }

            }

            currentUser.cart.items.push(req.body)

            currentUser.cart.total_price = calculateTotalCartPrice(currentUser.cart.items)
            currentUser.cart.total_discount = calculateTotalCartDiscount(currentUser.cart.items)

            User.findByIdAndUpdate({ _id: req.params.id }, currentUser).then(quantityUser => {
                User.findOne({ _id: req.params.id }).populate({ path: "cart", populate: { path: "items", populate: "product" } }).then(newUser => {
                    res.status(200).send(newUser)
                })
            }).catch(next)
        }).catch(next)

    })
}
const delete_one_product_from_cart = (req, res, next) => {
    User.findById({ _id: req.params.id }).populate({ path: "cart", populate: { path: "items", populate: "product" } }).then(user => {
        let newItems = user.cart.items.filter(item => item._id != req.body.item)
        let newCart = user.cart
        newCart.items = newItems
        newCart.total_price = calculateTotalCartPrice(newCart.items)
        newCart.total_discount = calculateTotalCartDiscount(newCart.items)
        User.findByIdAndUpdate({ _id: req.params.id }, { $set: { cart: newCart } }).then(pushedItem => {
            User.findOne({ _id: req.params.id }).populate({ path: "cart", populate: { path: "items", populate: "product" } }).then(newUser => {
                res.status(200).send(newUser)
            }).catch(next)
        }).catch(next)
    })
}


const delete_all_cart = (req, res, next) => {
    User.findById({ _id: req.params.id }).populate({ path: "cart", populate: { path: "items", populate: "product" } }).then(user => {
        let newItems = []
        User.findByIdAndUpdate({ _id: req.params.id }, { items: [] }).then(pushedItem => {
            User.findOne({ _id: req.params.id }).populate({ path: "cart", populate: { path: "items", populate: "product" } }).then(newUser => {
                res.status(200).send(newUser)
            }).catch(next)
        }).catch(next)
    })
}


module.exports = { create_cart, delete_one_product_from_cart, delete_all_cart }