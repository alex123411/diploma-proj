const { fetchDJINNIJobs } = require('./djinniService');
const UserRequest = require('../../models/requestModel');


const queryAllJobs = async (sites, query, userID) => {

    let result = {}

    if (sites.includes("Djinni.co")) {
        const djinniStats = await fetchDJINNIJobs(query, userID);
        // console.log(djinniStats)

        result.djinniStats = djinniStats
    }

    if (sites.includes("Work.ua")) {

    }

    try {
        const q = query.replaceAll('+', ' ');
        await UserRequest.create({ userId: userID, query: q, stats: JSON.stringify(result) })
    } catch (err) {
        console.error('ERROR ' + err)
    }

    return result;
}



module.exports = {
    queryAllJobs
};