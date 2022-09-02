const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const { request } = require('express')

const handleErrors = (err, req) => {
    let errors = { username: '', email: '', password: '', number: '' }
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(error => {
            errors[error.properties.path] = req.t(error.properties.message)
        })
    }
    if (err.message === 'incorrect email') {
        errors.email = req.t('email_not_correct')
    }
    if (err.message === 'incorrect password') {
        errors.password = req.t('password_not_correct')
    }
    if (err.code === 11000 && err.message.includes('username')) {
        errors.username = req.t('unique_username')
    }
    if (err.code === 11000 && err.message.includes('email')) {
        errors.email = req.t('unique_email')
    }
    return errors
}

const createToken = (id) => {
    return jwt.sign({ id }, 'ecommerce secret to help jwt token', { expiresIn: 1 * 24 * 60 })
}


const signup_post = async (req, res) => {
    User.create(req.body).then(user => {
        const token = createToken(user._id)
        res.cookie('token', token, { httpOnly: true, maxAge: 1 * 24 * 60 * 60 * 1000 })
        res.status(201).send(user)
    }).catch(err => {
        res.status(422).send(handleErrors(err, req))
    })


}

const login_post = async (req, res) => {
    try {
        const user = await User.login(req.body.email, req.body.password)
        const token = createToken(user._id)
        res.cookie('token', token, { httpOnly: true, maxAge: 1 * 24 * 60 * 60 * 1000 })
        res.status(200).send(user)
    } catch (err) {
        res.status(422).send(handleErrors(err, req))
    }

}

const logout_get = (req, res, next) => {
    try {
        res.cookie('token', '', { maxAge: 1 })
        res.sendStatus(200)
    } catch (error) {
        res.send(error.message)
    }

}


module.exports = { signup_post, login_post, logout_get }