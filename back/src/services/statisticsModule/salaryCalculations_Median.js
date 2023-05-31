const salaryCalculationsMedian = (salaries) => {
    let sum = 0;
    let maxSalary = 0;
    let salariesMedian = 0;
    if (salaries.length > 0) {
        for (let i = 0; i < salaries.length; i++) {
            const salary = salaries[i]
            let val = 0;
            if (salary.min) val = (salary.max + salary.min) / 2
            else val = (salary.max + salary.max / 2) / 2
            sum += val;
            if (maxSalary < salary.max) maxSalary = salary.max
        }
        salariesMedian = Math.ceil(sum / salaries.length)
    }

    return {
        maxSalary,
        salariesMedian
    }
}

module.exports = { salaryCalculationsMedian }