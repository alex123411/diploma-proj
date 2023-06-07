const express = require('express');
const router = express.Router();

const {
    getUser,
    updateUser,
    getUserReqs
} = require('../services/userService');



router.get('/', async (req, res) => {
    try {
        const { userId } = req.user;

        const user  = await getUser(userId);

        if (!user) {
            res.status(400).json({ message: "no info about this user" });
        }
        else {
            res.status(200).json({ user: user});
        }

    } catch (err) {
        res.status(err.status).json({ message: err.message });
    }
});

router.get('/reqs', async (req, res) => {
    try {
        const { userId } = req.user;

        const lastReqs = await getUserReqs(userId);

        if (!lastReqs) {
            res.status(400).json({ message: "no info about this users reqs" });
        }
        else {
            res.status(200).json({ lastReqs: lastReqs });
        }

    } catch (err) {
        res.status(err.status).json({ message: err.message });
    }
});

router.put('/', async (req, res) => {

    try {
        const { user } = req.body;

        const updatedUser = await updateUser(user);

        res.json({ updatedUser });

    } catch (err) {
        res.status(err.status).json({ message: err.message });
    }
})

module.exports = {
    userRouter: router
}