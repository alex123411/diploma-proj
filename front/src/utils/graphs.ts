import { ArrElem } from "../models/jobStatisticsModel"
import { dateNumToName, monthNumToColor } from "./dates"

const bgColors = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)',
]

const borderColors = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
]

export enum barCharts {
    POSTDATES,
    SALARIES
}

export const statsToBarChart = (arr: ArrElem[], label: barCharts) => {
    let labels: string[] = []
    let datas: number[] = []
    let backgroundColor: string[] = []

    arr.sort((a, b) => {
        return a.value > b.value ? 1 : -1;
    }).forEach((element, i: number) => {
        labels.push(element.value)
        datas.push(element.count)

        if (label == barCharts.POSTDATES) {
            const month = element.value.split('-')[1]
            backgroundColor.push(monthNumToColor[month])
        } else if (label == barCharts.SALARIES) {
            backgroundColor.push(bgColors[i % 6])
        }

    });

    if (label == barCharts.POSTDATES) {
        labels = dateNumToName(labels)
    } else if (label == barCharts.SALARIES) {
        labels = formSlariesLabels(labels)
    }

    const data = {
        labels: labels,
        datasets: [
            {
                data: datas,
                backgroundColor,
            },
        ],
    };

    return data
}

export const formSlariesLabels = (arr: string[]) => {
    let finalArr: string[] = []
    arr.forEach((element, i) => {
        finalArr.push(`Від ${element} ${element == '1' ? "року" : "років"}`)
    })
    return finalArr
}

export const statsToPieChart = (arr: ArrElem[], label: string) => {
    let labels: string[] = []
    let datas: number[] = []
    let borderColor: string[] = []
    let backgroundColor: string[] = []

    arr.sort((a, b) => {
        return a.value > b.value ? 1 : -1;
    }).forEach((element, i: number) => {
        if (element.value === "0") labels.push("без досвіду")
        else labels.push(`Від ${element.value} ${element.value == '1' ? "року" : "років"}`)
        datas.push(element.count)
        borderColor.push(borderColors[i % 6])
        backgroundColor.push(bgColors[i % 6])
    });

    return {
        labels: labels,
        datasets: [
            {
                label: label,
                data: datas,
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderWidth: 1,
            },
        ],
    }
}

