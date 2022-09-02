const Product = require('../models/productModel')
const Category = require('../models/categoryModel')
const SubCategory = require('../models/subcategoryModel')
const Brand = require('../models/brandModel')
const { addProductToArray } = require('../utilities/product_utility')
const create_product = (req, res, next) => {
    if (req.body.discount > req.body.price) {
        res.status(400).send({ message: "discount_cannot_be_less_than_product" })
        return;
    }
    Product.create(req.body).then(product => {
        addProductToArray(Category, product.category, product, next)
        if(req.body.subcategory){
            addProductToArray(SubCategory, product.subcategory, product, next)
        }   
        if (req.body.brand) {
            addProductToArray(Brand, product.brand, product, next)
        }
        res.status(200).send(product)
    }).catch(next)
}

const get_products = (req, res, next) => {
    const page = req.query.page - 1 || 0
    const per_page = 8
    if (req.query.brand) {
        Product.find({ $or: [{ brand: req.query.brand }] }).skip(page * per_page).limit(per_page).populate('category').populate('subcategory').populate('brand').then(product => {
            res.status(200).send(product)
            return;
        }).catch(next)
    }

    Product.find({ $or: [{ name: { $regex: req.query.search, $options: "i" } }, { nameAr: { $regex: req.query.search } }, { category: req.query.category }, { subcategory: req.query.subcategory }] }).count().then(total_products => {
        Product.find({ $or: [{ name: { $regex: req.query.search, $options: "i" } }, { nameAr: { $regex: req.query.search } }, { category: req.query.category }, { subcategory: req.query.subcategory }] }).skip(page * per_page).limit(per_page).populate('category').populate('subcategory').populate('brand').then(product => {
            res.status(200).send({ product,total_products, per_page })
        }).catch(next)
    })

}


const get_single_product = (req, res, next) => {
    Product.findById({ _id: req.params.id }).populate('category').populate('subcategory').then(product => res.status(200).send(product)).catch(err=>{
        res.status(404).send({message:"not_found"})
    })
}

const delete_product = (req, res, next) => {
    Product.findByIdAndRemove({ _id: req.params.id }).then(product => {
        res.status(200).send(product)
    }).catch(next)
}

const update_product = (req, res, next) => {
    Product.findByIdAndUpdate({ _id: req.params.id }, req.body).then(prevProduct => {
        Product.findOne({ _id: req.params.id }).then(newProduct => {
            res.status(200).send(newProduct)
        })
    }).catch(next)
}

const getNewestProducts = (req, res, next) => {
    Product.find({}).sort({ createdAt: -1 }).limit(4).populate('category').populate('subcategory').populate('brand').then(product => {
        res.status(200).send(product)
    }).catch(next)
}

const getMostOrderedProducts = (req, res, next) => {
    Product.find({}).sort({ items_ordered: 1 }).limit(4).populate('category').populate('subcategory').populate('brand').then(product => {
        res.status(200).send(product)
    }).catch(next)
}

module.exports = { create_product, get_products, get_single_product, delete_product, update_product, getNewestProducts, getMostOrderedProducts }