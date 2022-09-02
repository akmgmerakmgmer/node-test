const Brand = require('../models/brandModel')
const Product = require('../models/productModel')

const create_brand = (req, res, next) => {
    Brand.create(req.body).then(brand => {
        res.status(200).send(brand)
    }).catch(next)
}

const get_brands = (req, res, next) => {
    Brand.find({}).then(brand => {
        res.status(200).send(brand)
    }).catch(next)
}


const get_single_brand = (req, res, next) => {
    Brand.findById({ _id: req.params.id }).then(brand => res.status(200).send(brand)).catch(next)
}

const delete_brand = (req, res, next) => {
    Brand.findByIdAndRemove({ _id: req.params.id }).then(brand => {
        Product.findByIdAndUpdate({_id:brand.products},{$set:{brand:null}}).then(product=>{}).catch(next)
        res.status(200).send(brand)
    }).catch(next)
}

const update_brand = (req, res, next) => {
    Brand.findByIdAndUpdate({ _id: req.params.id }, req.body).then(oldBrand => {
        Brand.findOne({ _id: req.params.id }).then(newBrand => {
            Product.findByIdAndUpdate({_id:newBrand.products},{$set:{brand:newBrand}}).then(product=>{}).catch(next)
            res.status(200).send(newBrand)
        })
    }).catch(next)
}
module.exports = { create_brand, get_brands, get_single_brand, delete_brand, update_brand }