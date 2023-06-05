import { ArrElem } from "../services/PositionService";

export const allCitiesInUkraine = [
    "Cherkasy",
    "Chernihiv",
    "Chernivtsi",
    "Dnipro",
    "Donetsk",
    "Ivano-Frankivsk",
    "Kharkiv",
    "Kherson",
    "Khmelnytskyi",
    "Kropyvnytskyi",
    "Kyiv",
    "Luhansk",
    "Lviv",
    "Mykolaiv",
    "Odesa",
    "Poltava",
    "Rivne",
    "Sumy",
    "Ternopil",
    "Vinnytsia",
    "Lutsk",
    "Uzhhorod",
    "Zaporizhzhia",
    "Zhytomyr"
]



export const regionNameToShortcut: { [Name: string]: string } = {
    "Cherkasy": "ua-ck",
    "Chernihiv": "ua-ch",
    "Chernivtsi": "ua-cv",
    "Dnipro": "ua-dp",
    "Donetsk": "ua-dt",
    "Ivano-Frankivsk": "ua-if",
    "Kharkiv": "ua-kk",
    "Kherson": "ua-ks",
    "Khmelnytskyi": "ua-km",
    "Kropyvnytskyi": "ua-kh",
    "Kyiv": "ua-kc",
    "Luhansk": "ua-lh",
    "Lviv": "ua-lv",
    "Mykolaiv": "ua-mk",
    "Odesa": "ua-my",
    "Poltava": "ua-pl",
    "Rivne": "ua-rv",
    "Sumy": "ua-sm",
    "Ternopil": "ua-tp",
    "Vinnytsia": "ua-vi",
    "Lutsk": "ua-vo",
    "Uzhhorod": "ua-zk",
    "Zaporizhzhia": "ua-zp",
    "Zhytomyr": "ua-zt"
};

export const fillMapDataUkraine = (arr: ArrElem[]): [string, number][] => {
    let mapDataUkraine: [string, number][] = [];
    arr.forEach(element => {
        mapDataUkraine.push([regionNameToShortcut[element.value], element.count])
    });

    return mapDataUkraine
}