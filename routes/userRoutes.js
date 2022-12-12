const express = require('express')
const router = express.Router()
const joi = require('joi')
const { User, validate } = require('../models/userModel')
const bcrypt = require('bcrypt')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const Token = require('../models/token')
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')



const validateLogin = data => {
    const schema = joi.object({
        email: joi.string().email().required().label('Email'),
        password: joi.string().min(6).required().label('Password'),
    })
    return schema.validate(data)
}



router.post('/signup', async (req, res) => {
    try {

        const { error } = validate(req.body)
        if (error) return res.status(400).json({ message: error.details[0].message })

        const user = await User.findOne({email: req.body.email})

        if (user) return res.status(409).json({ message: 'User already exists' })

        const hashPassword = await bcrypt.hash(req.body.password, 10)

        const result = await User.create({...req.body, password: hashPassword })

        const token = await Token.create({
            userId: result._id,
            token: crypto.randomBytes(32).toString('hex'),
        })

        const url = `${process.env.BASE_URL}users/${token.userId}/verify/${token.token}`;
        await sendEmail(result.email, "Verify your account", 
        `Welcome to this amazing website !!
        Verify Your account by clicking this link:
        ${url}
        `);

        res.status(201).json({ message: 'An email has been sent to verify your account'})

    } catch (error) {
        res.status(500).json({message: 'Internal Server Error'})
    }
})

router.post('/login', async (req, res) => {

    try {
        const { error } = validateLogin(req.body)
        if (error) return res.status(400).json({ message: error.details[0].message})

        const user = await User.findOne({email: req.body.email})

        if (!user) return res.status(404).json({ message: 'User not found' })

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if(!validPassword) return res.status(403).json({ message: 'Invalid Credentials' })

        if(!user.verified) {
            let token = await Token.findOne({ userId: user._id})
            if(!token) {
                const token = await Token.create({
                    userId: user._id,
                    token: crypto.randomBytes(32).toString('hex'),
                })
                const url = `${process.env.BASE_URL}users/${token.userId}/verify/${token.token}`;
                await sendEmail(user.email, "Verify your account", url);
                return res.status(401).json({ message: 'An email has been sent to your email address'})
            }

            return res.status(400).json({ message: 'An email has already been sent to verify your account'})
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
        res.status(200).json({ user, token })
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error'})
    }
})

router.get("/:id/verify/:token", async (req, res) => {
    try {
        const user = await User.findOne({_id: req.params.id})
        if (!user) return res.status(404).json({ message: 'Link Invalid or Expired'})
        
        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });

        if (!token) return res.status(404).json({ message: 'Token Invalid or expired' })

        const result = await User.findByIdAndUpdate(user._id, { verified: true }, {new: true});
        await Token.deleteOne({ userId: user._id, token: req.params.token });
        
        res.status(200).json({ user: result, message: 'Email Verified. You can login now' })
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error'})
        
    }
})

module.exports = router
