const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: [true, 'username_required'],
        minlength: [6, 'username_min_length'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'email_required'],
        validate: [isEmail, 'email_not_valid']
    },
    password: {
        type: String,
        minlength: [6, 'password_min_length'],
        required: [true, 'password_required'],
    },
    number: {
        type: String,
        minlength: [11, 'number_min_length'],
        maxlength: [11, 'number_min_length'],
        required: [true, 'number_required']
    },
    coupons: [{
        code: {
            type: String
        },
        amount: {
            type: Number
        },
        useTimes: {
            type: Number,
            default: 10000000000000000000
        }
    }],
    cart: {
        items: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: 'product'
                },
                quantity: {
                    type: Number,
                    required: true
                },
                chosenColor: {
                    type: String
                },
                chosenSize: {
                    type: String
                },
                price: {
                    type: Number
                },
                discount: {
                    type: Number
                }
            }
        ],
        total_price: {
            type: Number,
            default: 0
        },
        total_discount: {
            type: Number,
            default: 0
        },
        shipping_fees: {
            type: Number,
            default: 25
        }
    },
    orders:[]
}, {
    timestamps: true
})


UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

UserSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email })
    if (user) {
        const auth = await bcrypt.compare(password, user.password)
        if (auth) {
            return user
        }
        throw Error('incorrect password')
    }
    throw Error('incorrect email')
}
const User = mongoose.model('user', UserSchema)
module.exports = User