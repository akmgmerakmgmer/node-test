const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const get_users = (req, res, next) => {
    User.find({}).populate({ path: "cart", populate: { path: "items", populate: "product" } }).then(user => {
        res.status(200).send(user)
    }).catch(next)
}

const get_current_user = (req, res, next) => {
    const token = req.cookies.token
    if (token) {
        jwt.verify(token, 'ecommerce secret to help jwt token', async (err, decodedToken) => {
            if (err) {
                res.sendStatus(401)
            } else {
                let user = await User.findById(decodedToken.id).populate({ path: "cart", populate: { path: "items", populate: "product" } })
                res.status(200).send(user)
            }
        })
    }
}

const get_single_user = (req, res, next) => {
    User.findById({ _id: req.params.id }).populate({ path: "cart", populate: { path: "items", populate: "product" } }).then(user => res.status(200).send(user)).catch(next)
}

const delete_user = (req,res,next)=>{
    User.findByIdAndRemove({_id:req.params.id}).then(user=>{
        res.status(200).send(user)
    }).catch(next)
}

const update_user = (req,res,next)=>{
    User.findByIdAndUpdate({_id:req.params.id},req.body).then(user=>{
        User.findOne({_id:req.params.id}).then(user=>res.status(200).send(user))
    }).catch(next)
}
module.exports = { get_users, get_current_user, get_single_user,delete_user,update_user }