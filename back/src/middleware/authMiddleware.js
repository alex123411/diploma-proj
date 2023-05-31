const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        const {
            authorization
        } = req.headers;

        if (!authorization) {

            return res.status(401).json({ message: 'Please, provide "authorization" header' });
        }

        const [, token] = authorization.split(' ');

        if (!token) {
            return res.status(401).json({ message: 'Please, include token to request' });
        }

        try {
            const tokenPayload = jwt.verify(token, 'secret');
            console.log(tokenPayload)
            req.user = {
                userId: tokenPayload.id,
                email: tokenPayload.email,
            };
            console.log("jwt signed")
            next();
        } catch (err) {
            console.error("error catched", err)
            res.status(401).json({ message: err.message });
        }
    }
    catch (err) {
        console.log(err.message)
    }

}

module.exports = {
    authMiddleware
}