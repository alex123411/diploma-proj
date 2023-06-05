const Job = require('../../models/jobModel');
const { fetchDJINNIJobs } = require('./djinniService');



const queryAllJobs = async (sites, query) => {

    let result = {}

    if(sites.includes("Djinni.co")) {
        const djinniStats = await fetchDJINNIJobs(query);
        // console.log(djinniStats)

        result.djinniStats = djinniStats
    }

    if(sites.includes("Work.ua")) {

    }

    return result;
}

module.exports = {
    queryAllJobs
};