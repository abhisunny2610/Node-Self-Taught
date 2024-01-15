const { createHmac, randomBytes } = require('crypto')
const mongoose = require('mongoose')
const { createTokenForUser } = require('../service/auth')

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        salt: {
            type: String,
            // required: true
        },
        password: {
            type: String,
            required: true,

        },
        profile: {
            type: String,
            default: './public/images/149071.png'
        },
        role: {
            type: String,
            enum: ["USER", "ADMIN"],
            default: 'USER'
        }
    },
    {
        timestamps: true
    }

)

userSchema.pre('save', function (next) {
    const user = this

    if (!user.isModified('password')) return;

    const salt = randomBytes(16).toString()
    const hashedPassword = createHmac('sha256', salt).update(user.password).digest('hex');

    this.salt = salt;
    this.password = hashedPassword

    next()
})

userSchema.static("matchPassword", async function (email, password) {
    const user = await this.findOne({ email })

    if (!user) {
        throw new Error("User not found")
    }

    const salt = user.salt
    const hashedPassword = user.password

    const userProvideHash = createHmac('sha256', salt).update(password).digest('hex')

    if (hashedPassword !== userProvideHash) {
        throw new Error("Invalid email or password")
    }

    const token = createTokenForUser(user)
    return token
})

const User = mongoose.model('user', userSchema)

module.exports = User