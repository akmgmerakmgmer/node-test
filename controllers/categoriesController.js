const Category = require('../models/categoryModel')
const Product = require('../models/productModel')
const SubCategory = require('../models/subcategoryModel')

const create_category = (req, res, next) => {
    Category.create(req.body).then(category => {
        res.status(200).send(category)
    }).catch(next)
}

const get_categories = (req, res, next) => {
    Category.find({}).populate('products').populate('subcategory').then(category => {
        res.status(200).send(category)
    }).catch(next)
}


const get_single_category = (req, res, next) => {
    Category.findById({ _id: req.params.id }).populate('subcategory').then(category => res.send(category)).catch(err=>{
        res.status(404).send({message:"not_found"})
    })
}

const delete_category = async(req, res, next) => {
    const products = await Product.find({category:{$in:[req.params.id]}})
    if(products.length>0){
        res.status(400).send({message:'cannot_delete_category_attached_to_product'})
        return;
    }

    const subcategories = await SubCategory.find({category:{$in:[req.params.id]}})
    if(subcategories.length>0){
        res.status(400).send({message:'cannot_delete_category_attached_to_subcategory'})
        return;
    }
    Category.findByIdAndRemove({ _id: req.params.id }).then(category => {
        res.status(200).send(category)
    }).catch(next)
}

const update_category = (req, res, next) => {
    Category.findByIdAndUpdate({ _id: req.params.id }, req.body).then(prevCategory => {
        Category.findOne({ _id: req.params.id }).then(newCategory => {
            res.send(newCategory)
        })
    }).catch(next)
}
module.exports = { create_category, get_categories, get_single_category, delete_category, update_category }