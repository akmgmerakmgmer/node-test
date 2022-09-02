const Subcategory = require('../models/subcategoryModel')
const Product = require('../models/productModel')
const Category = require('../models/categoryModel')

const create_subcategory = (req, res, next) => {
    Subcategory.create(req.body).then(subcategory => {
        Category.findByIdAndUpdate({_id:subcategory.category},{$push:{subcategory:subcategory} }).then(category=>{
        
        }).catch(next)
        res.status(200).send(subcategory)
    }).catch(next)
}

const get_subcategories = (req, res, next) => {
    Subcategory.find({}).populate('products').populate('category').then(subcategory => {
        res.status(200).send(subcategory)
    }).catch(next)
}


const get_single_subcategory = (req, res, next) => {
    Subcategory.findById({ _id: req.params.id }).then(subcategory => res.send(subcategory)).catch(err=>{
        res.status(404).send({message:"not_found"})
    })
}

const delete_subcategory = async(req, res, next) => {
    const products = await Product.find({subcategory:{$in:[req.params.id]}})
    if(products.length>0){
        res.status(400).send({message:'cannot_delete_subcategory_attached_to_product'})
        return;
    }
    Subcategory.findByIdAndRemove({ _id: req.params.id }).then(subcategory => {
        res.status(200).send(subcategory)
    }).catch(next)
}

const update_subcategory = (req, res, next) => {
    Subcategory.findByIdAndUpdate({ _id: req.params.id }, req.body).then(subcategory => {
        Subcategory.findOne({ _id: req.params.id }).then(subcategory => res.status(200).send(subcategory))
    }).catch(next)
}
module.exports = { create_subcategory, get_subcategories, get_single_subcategory, delete_subcategory, update_subcategory }