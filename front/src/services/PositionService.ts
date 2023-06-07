
import axios from 'axios';
import { statsMOCK } from '../mock/mockJobData';
import { PositionStats } from '../models/jobStatisticsModel';

const BASE_URL = "http://localhost:3000/api/"

const PositionService = {

    getPositionStatsData: async (query: string) => {
        let stats: PositionStats = { ...getEmptyPositionStats() }
        // stats = statsMOCK
        await axios.post(`${BASE_URL}job`, {
            "query": query.trim().replaceAll(' ', '+'),
            "sites": ["Djinni.co"]
        })
            .then(response => {
                stats = response.data.stats.djinniStats;  
                console.log(stats)
                return stats;
            })
            .catch(error => {
                console.error('Failed to fetch position data:', error);
                return {}
            });
        return stats
    }

};


export const getEmptyPositionStats = () => {
    return {
        skills: [],
        salaries: {
            maxSalary: 0,
            median: 0,
            basedOnExperience: []
        },
        companies: [],
        experience: [],
        applicants: {
            numberOfPostings: 0,
            applicantsForOnePosting: 0
        },
        datePosted: [],
        location: {
            cities: [],
            countries: []
        },
        english: []

    }
}


export default PositionService