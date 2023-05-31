const salaryCalculations = (inputArray) => {

    const resultArray = [];
    const uniqueExperiences = new Set();

    // Step 2: Extract unique experience values
    inputArray.forEach(obj => {
        uniqueExperiences.add(obj.experience);
    });

    // Step 3 and 4: Calculate average salary for each experience
    uniqueExperiences.forEach(experience => {
        const filteredObjects = inputArray.filter(obj => obj.experience === experience);
        let count = 0;
        let sum = 0;
        for (let i = 0; i < filteredObjects.length; i++) {
            const { min, max } = inputArray[i].salary;
            if (max) {
                count++
                sum += (min || max / 2) + max
            }
        }

        let averageSalary = count > 0 ? sum / (count * 2) : "No data found";

        resultArray.push({ experience, averageSalary });
    });

    return resultArray
}

module.exports = { salaryCalculations }