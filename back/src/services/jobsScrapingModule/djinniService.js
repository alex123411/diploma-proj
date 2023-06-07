const axios = require('axios');
const cheerio = require('cheerio');

const Job = require('../../models/jobModel');
const Recruiter = require('../../models/recruiterModel');
const Category = require('../../models/categoryModel');
const EnglishLevel = require('../../models/englishLevelModel');
const UserRequest = require('../../models/requestModel');

const { generateTable } = require('../statisticsModule/uniqueValueCount');
const { salaryCalculations } = require('../statisticsModule/salaryCalculations');
const { salaryCalculationsMedian } = require('../statisticsModule/salaryCalculations_Median');

const DJINNI_URL = "https://djinni.co"


const fetchAllJobs = async (query, userID) => {

    let skills = []
    let salaries = [];
    let salariesWithExperience = [];
    let experience = [];
    let applicants = [];
    let datePosted = [];
    let companies = [];
    let cities = [];
    let countries = [];
    let englishLevels = [];
    let stats = {}

    let x = 1;
    for (let i = 0; i < x; i++) {
        const queryString = `${DJINNI_URL}/jobs/?all-keywords=${query}&any-of-keywords=&exclude-keywords=&keywords=${query}&page=${i + 1}`

        await axios.get(queryString)
            .then(async (response) => {
                const html = response.data
                const $ = cheerio.load(html)

                // console.log(`Iteration: ${i + 1}`)
                // console.log('------------------')

                if (i === 0) {
                    // retrieving pagination info
                    const totalCount = getCount($)
                    const limit = 15;
                    const totalPages = Math.ceil(totalCount / limit)

                    x = totalPages
                    console.log(totalCount, totalPages)
                }

                // retreiving jobs ids to scrape data from them
                const jobsLinks = getJobsLinks($)

                // console.log(jobsLinks)
                // console.log('------------------')

                await scrapeDataFromJobsOnPage(jobsLinks)
                    .then(stats => {
                        // This will contain the stats added during the forEach loop
                        skills = skills.concat(stats.skills)
                        salaries = salaries.concat(stats.salaries.all)
                        salariesWithExperience = salariesWithExperience.concat(stats.salaries.basedOnExperience)
                        experience = experience.concat(stats.experience)
                        applicants = applicants.concat(stats.applicants)
                        datePosted = datePosted.concat(stats.datePosted)
                        companies = companies.concat(stats.companies)
                        cities = cities.concat(stats.location.cities)
                        countries = countries.concat(stats.location.countries)
                        englishLevels = englishLevels.concat(stats.englishLevels)
                    })
                    .catch(error => {
                        console.error('error', error);
                    });


            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    // Get stats from scraped data
    try {
        const skillsThreshold = skills.length < 10 ? 1 : skills.length < 50 ? 2 : 3;
        const skillsTable = generateTable(skills, skillsThreshold, 'skills');

        const datePostedTable = generateTable(datePosted, 1, 'datesPosted');

        const experienceTable = generateTable(experience, 1, 'exp');

        let companiesThreshold = companies.length < 100 ? 1 : 2
        const companiesTable = generateTable(companies, companiesThreshold, 'companies');

        const citiesTable = generateTable(cities, 1, 'city');

        const countriesTable = generateTable(countries, 1, 'country');

        const englishLevelsTable = generateTable(englishLevels, 1, 'english-level');

        let sum = 0;
        for (let i = 0; i < applicants.length; i++) {
            sum += parseInt(applicants[i]); // or parseFloat(numberStrings[i]) for decimal numbers
        }
        const applicantsMedian = Math.ceil(sum / applicants.length)

        const { maxSalary, salariesMedian } = salaryCalculationsMedian(salaries)

        const basedOnExperience = salaryCalculations(salariesWithExperience)


        const djinniStats = {
            skills: skillsTable,
            salaries: {
                maxSalary,
                median: salariesMedian !== 0 ? salariesMedian : "No data available",
                basedOnExperience: basedOnExperience
            },
            companies: companiesTable,
            experience: experienceTable,
            applicants: {
                numberOfPostings: applicants.length,
                applicantsForOnePosting: applicantsMedian
            },
            datePosted: datePostedTable,
            location: {
                cities: citiesTable,
                countries: countriesTable
            },
            english: englishLevelsTable
        }

        return djinniStats

    } catch (err) {
        console.log("ERR", err)
        return []
    }
}



const insertData = async (Model, Data) => {

    Data.forEach(async elem => {
        try {
            console.log("INSERTING" + elem.id)
            await Model
                .findOrCreate({
                    where: { id: elem.id },
                    defaults: {
                        ...elem
                    }
                })
                .catch(err => {
                    console.error('Error:', err);
                });
        } catch (err) {
            console.error('err' + err)
        }
    });
}

const bulkCreate = async (Model, Data) => {
    await Model.bulkCreate(Data)
        .then(() => {
            console.log(`refreshed ${Model.modelName}`)
        })
        .catch((err) => {
            console.error(`Error inserting values: ${Model.modelName}`, err);
        })
}

const removeDuplicates = (arr) => {
    return arr.filter((v, i, a) => a.findIndex(v2 => (v2.id === v.id)) === i)
}

const getCount = ($) => {
    const countSelectorPath = 'body > div.wrapper > div.container > div.page-header > h1 > span'

    const count = $(countSelectorPath).text()

    return count
}

const getJobsLinks = ($) => {
    const jobsLinks = []

    for (let i = 0; i < 15; i++) {
        const jobLinkSelectorPath = `body > div.wrapper > div.container > div.row > div.col-md-8.row-mobile-order-2 > ul.list-unstyled.list-jobs > li:nth-child(${i + 1}) > div.d-flex.align-items-md-center.flex-column.flex-sm-row > div.list-jobs__title.list__title.order-1 > a`

        const jobLink = $(jobLinkSelectorPath).attr('href')

        if (!jobLink) return jobsLinks
        jobsLinks.push(jobLink)
    }

    return jobsLinks
}

const scrapeDataFromJobsOnPage = async (jobsLinks) => {

    const selectorPaths = {
        skills: 'body > div.wrapper > div.container.job-post-page > div:nth-child(3) > div.col-sm-4.row-mobile-order-1 > div > ul:nth-child(1) > li:nth-child(2) > div',
    }

    // STATISTIC ABOUT JOB
    let skills = [];
    let salaries = [];
    let salariesWithExperience = [];
    let experience = [];
    let applicants = [];
    let datePosted = [];
    let companies = [];
    let cities = [];
    let countries = [];
    let englishLevels = [];

    let recruitersDB = []
    let categoriesDB = []
    let englishLevelsDB = []
    let jobs = []
    // Create an array to store the promises
    const htmlScrapingPromises = jobsLinks.map((jobLink) => {
        const fullJobLink = DJINNI_URL + jobLink;
        return axios.get(fullJobLink)
            .then(response => {
                // console.log('scraping job posting: ' + fullJobLink)
                const html = response.data;
                const $ = cheerio.load(html);

                // SCRAPING SKILLS
                const skillsSpans = $(selectorPaths.skills).find('span');
                skillsSpans.each((index, element) => {
                    const spanText = $(element).text();
                    skills.push(spanText);
                });

            })
            .catch(error => {
                console.error('Error:', error);
            });
    });

    const apiScrapingPromises = jobsLinks.map((jobLink) => {
        const jobId = jobLink.split('-')[0]
        const fullJobLink = DJINNI_URL + '/api' + jobId;

        return axios.get(fullJobLink)
            .then(response => {
                // console.log('scraping job posting api: ' + fullJobLink)
                const job = response.data

                // Experience
                if (job.experience) experience.push(job.experience)
                else experience.push(0)

                // Salary
                let salary = {
                    min: job.public_salary_min,
                    max: job.public_salary_max
                }

                if (job.public_salary_min || job.public_salary_max) salaries.push(salary)

                // Salaries based on exp
                salariesWithExperience.push({ experience: job.experience, salary })

                // Applicants
                if (job.applications_count) applicants.push(job.applications_count)

                // Location
                //Cities
                if (job.location) cities.push(...job.location.split(', '))

                // Country
                if (job.is_ukraine_only) countries.push("Ukraine")
                else countries.push("Abroad")

                // Company
                if (job.company_name) companies.push(job.company_name + " - " + job.recruiter.employer_website)

                // Date posted
                if (job.published) datePosted.push(job.published.split('T')[0])

                // English Level
                if (job.english.name) englishLevels.push(job.english.name)


                // ADDING DATA TO DB
                recruitersDB.push(job.recruiter)
                categoriesDB.push(job.category)
                englishLevelsDB.push(job.english)
                jobs.push(job)
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });


    // Wait for all promises to resolve
    await Promise.all(htmlScrapingPromises);

    await Promise.all(apiScrapingPromises);

    // PUSHING SCRAPED DATA TO DB
    await Promise.all([
        insertData(
            EnglishLevel,
            removeDuplicates(englishLevels)
        ),
        await insertData(
            Category,
            removeDuplicates(categoriesDB)
        ),
        await insertData(
            Recruiter,
            removeDuplicates(recruitersDB)
        ),
        await insertData(Job, jobs)
    ])

    const stats = {
        skills,
        salaries: {
            all: salaries,
            basedOnExperience: salariesWithExperience
        },
        experience,
        applicants,
        datePosted,
        companies,
        location: {
            cities,
            countries
        },
        englishLevels
    }
    return stats;
}

module.exports = {
    fetchDJINNIJobs: fetchAllJobs
}