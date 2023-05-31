const jwt = require('jsonwebtoken');
const { badRequestError } = require('../errors')

const User = require('../models/userModel.js')

const signUp = async ({ email, password }) => {
    if (await User.findOne({ where: { email: email } })) { throw new badRequestError('user with such email alredy exists!'); }

    await User.create({ name: email.split('@')[0], email: email, password: password })
}

const logIn = async ({ email, password }) => {
    const user = await User.findOne({
        where: { email: email }
    });

    if (!user || !(password == user.password)) {
        throw new badRequestError('wrong email or password');
    }

    const token = jwt.sign({
        id: user.id,
        email: user.email
    }, 'secret');
    console.log(user.id)
    return token;
}


module.exports = {
    signUp,
    logIn,
};