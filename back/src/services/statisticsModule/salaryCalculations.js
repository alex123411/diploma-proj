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
            const { min, max } = filteredObjects[i].salary;
            if (min || max) {
                count++
                sum += ((min || max / 2) + (max || min * 1.5)) / 2
            }
        }

        let averageSalary = count > 0 ? (sum / count) : "No data found";

        resultArray.push({ value: `${experience}`, count: averageSalary });
    });

    return resultArray.sort((a, b) => {
        return a.value < b.value ? 1 : -1;
    })
}

module.exports = { salaryCalculations }