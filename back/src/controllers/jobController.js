const express = require('express');
const router = express.Router();
const { badRequestError } = require('../errors')

const {
    queryAllJobs
} = require('../services/jobsScrapingModule/jobService');


router.post('/', async (req, res) => {
    try {
        const {
            sites,
            query
        } = req.body

        console.log(req.body)
        if (!query || !sites) throw new badRequestError(`Please provide body: {sites: [...], query: '...'}`);

        const stats = await queryAllJobs(sites, query, req.user.userId);

        res.status(200).json({ stats });
    } catch (err) {
        res.status(err.status).json({ message: err.message });
    }
});

module.exports = {
    jobRouter: router
}