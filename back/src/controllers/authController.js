const express = require('express');
const router = express.Router();
const validator = require('email-validator');

const {
    signUp,
    logIn
} = require('../services/authService.js');

const {
    badRequestError,
    eternalServerError
} = require('../errors');

router.post('/register', async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        if (!(validator.validate(email))) {
            throw new badRequestError('Bad email!')
        }

        await signUp({email, password});

        res.json({ message: 'Profile created successfully!' });

    } catch (err) {
        res.status(err.status).json({ message: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        const token = await logIn({ email, password });

        res.status(200).json({ "token": token });

    } catch (err) {
        res.status(err.status).json({ message: err.message });
    }
});

module.exports = {
    authRouter: router
}