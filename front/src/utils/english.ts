import { ArrElem } from "../models/jobStatisticsModel";

export const englishLevelToValue: { [numberAsString: string]: string } = {
    "No English": "1",
    "Beginner/Elementary": "2",
    "Pre-Intermediate": "3",
    "Intermediate": "4",
    "Upper-Intermediate": "5",
    "Advanced/Fluent": "6"
};

export const valueToEnglishLevel: { [numberAsString: string]: string } = {
    "1": "No English",
    "2": "Beginner/Elementary",
    "3": "Pre-Intermediate",
    "4": "Intermediate",
    "5": "Upper-Intermediate",
    "6": "Advanced/Fluent"
};

export const sortEnglishLevels = (arr: ArrElem[]) => {
    return arr.sort((a, b) => {
        return englishLevelToValue[a.value] < englishLevelToValue[b.value] ? 1 : -1;
    })
}

export const getAverageLevel = (arr: ArrElem[]): number => {
    let sum = 0;
    let count = 0;
    arr.forEach(element => {
        count += element.count
        sum += element.count * parseInt(englishLevelToValue[element.value])
    });
    return sum / count
}