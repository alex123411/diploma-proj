const numberToMonthEng: { [numberAsString: string]: string } = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    "10": "October",
    "11": "November",
    "12": "December"
};

const numberToMonthUa: { [numberAsString: string]: string } = {
    "01": "Січень",
    "02": "Лютий",
    "03": "Березень",
    "04": "Квітень",
    "05": "Травень",
    "06": "Червень",
    "07": "Липень",
    "08": "Серпень",
    "09": "Вересень",
    "10": "Жовтень",
    "11": "Листопад",
    "12": "Грудень"
};

export const monthNumToColor: { [numberAsString: string]: string } = {
    "01": 'rgba(255, 99, 132, 0.5)',
    "02": 'rgba(255, 159, 64, 0.5)',
    "03": 'rgba(255, 205, 86, 0.5)',
    "04": 'rgba(75, 192, 192, 0.5)',
    "05": 'rgba(54, 162, 235, 0.5)',
    "06": 'rgba(153, 102, 255, 0.5)',
    "07": 'rgba(201, 203, 207, 0.5)',
    "08": 'rgba(53, 162, 235, 0.5)',
    "09": 'rgba(255, 99, 132, 0.5)',
    "10": 'rgba(255, 159, 64, 0.5)',
    "11": 'rgba(75, 192, 192, 0.5)',
    "12": 'rgba(255, 206, 86, 0.5)'
};

export const dateNumToName = (arr: string[]) => {
    let finalArr: string[] = []
    arr.forEach((elem, i) => {
        const dateValues = elem.split('-')
        finalArr.push(`${numberToMonthUa[dateValues[1]]} ${dateValues[2]} `)
    })
    return finalArr
}