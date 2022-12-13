const mongoose = require('mongoose');
require('dotenv').config();
const joi = require('joi');
const passwordComplexity = require('joi-password-complexity');


const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    }
})

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id : this._id}, process.env.JWT_SECRET, {expiresIn : '1d'});
    return token;
}

const User = mongoose.model('User', userSchema);


const validate = (data) => {
    const schema = joi.object({
        firstName: joi.string().required().label('First Name'),
        lastName: joi.string().required().label('Last Name'),
        email: joi.string().email().required().label('Email'),
        password: passwordComplexity().required().label('Password'),
        confirmPassword: joi.string().required().label('Confirm Password')
    })
    return schema.validate(data);
}

module.exports ={ User, validate}

