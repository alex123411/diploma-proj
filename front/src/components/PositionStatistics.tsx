import { FC, PropsWithChildren, useEffect, useState } from "react"
import { PositionStats } from "../services/PositionService";
import ContentBox from "./UI/ContentBox";
import {
    Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale,
    LinearScale,
    BarElement,
    Title,
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { barCharts, statsToBarChart, statsToPieChart } from "../utils/graphs";
import UserService, { User, emptyUser } from "../services/UserService";
import { useNavigate } from "react-router-dom";
import { getAverageLevel, sortEnglishLevels, valueToEnglishLevel } from "../utils/english";
import UkraineMap from "./UkraineMap";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

interface Props extends PropsWithChildren {
    className?: string;
    stats: PositionStats;
    positionToSearch: string;
    userData: User
}


const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
    },
}

const optionsSalaries = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            text: "Зарплати проаналізовані згідно з публічною інформацією",
            display: true,
        },
    },
}



const PositionStatistics: FC<Props> = ({ userData, positionToSearch, stats, children, className, ...props }) => {

    const userHasSkill = (skill: string) => {
        for (let i = 0; i < userData.skills.length; i++) {
            let element = userData.skills[i]
            if (skill == element.replaceAll(' ', '').toLocaleLowerCase()) {
                return true
            }
        }
        return false
    }

    return (

        stats.applicants?.numberOfPostings ?
            <div {...props} className={"d-flex flex-column align-items-center " + className}>
                {
                    positionToSearch
                        ?
                        <h1>{`Статистика про вакансію "${positionToSearch}"`}</h1>
                        :
                        <></>
                }
                <ContentBox className="w-100 row m-0">
                    <div className="col-3">
                        <h5 className="text-center">Актуальні оголошення</h5>
                        <span>{`Всього оголошень проаналізовано: `}<b>{`${stats.applicants?.numberOfPostings}` ?? 'інформація не знайдена'}</b></span>
                        <br />
                        <span>{`Середня кількість кандидатів на одне оголошення: `}<b>{`${stats.applicants?.applicantsForOnePosting}` ?? 'інформація не знайдена'}</b></span>
                    </div>
                    <div className="col-5">
                        <h5 className="text-center">Розміщено оголошень кожного дня</h5>
                        <Bar options={options} data={statsToBarChart(stats.datePosted, barCharts.POSTDATES)} />
                    </div>
                    <div className="col-4">
                        <h5 className="text-center">Компанії з найбільшою пропозицією</h5>
                        <ul>
                            {stats.companies.map((elem, i) =>
                                i < 9 ?
                                    <li key={elem.value}>
                                        <a
                                            target="_blank"
                                            href={elem.value.split(' - ')[1]}
                                        >
                                            {elem.value.split(' - ')[0]}
                                        </a>
                                        {` розміщує ${elem.count} ${elem.count == 1 ? "вакансію" : "вакансії"}`}
                                    </li> : <></>
                            )}
                        </ul>
                    </div>
                </ContentBox>
                <ContentBox className="w-100 row m-0">
                    <div className="col-3">
                        <h5 className="text-center">Бажаний досвід кандидата</h5>
                        <Pie data={statsToPieChart(stats.experience, 'Потреба з таким досвідом зустрічається')} />
                    </div>
                    <div className="col-5 ">
                        <h5 className="text-center"> Навички</h5>
                        <span><b>Найчастіше вимагаються</b></span> <br></br>
                        <div className="skills-container justify-content-evenly mb-3">
                            {stats.skills.map((elem, i) =>
                                i < 3 && elem.value ?
                                    <span
                                        key={elem.value}
                                        className={`text-center main skill-plate rounded-3`.concat(userHasSkill(elem.value) ? ' has' : ' absent')}>
                                        {elem.value} <br />{`(Зустрічається ${elem.count} разів)`}
                                    </span> : <></>
                            )}
                        </div>
                        <span><b>Також вимагаються</b></span>
                        <div className="skills-container">
                            {stats.skills.map((elem, i) =>
                                i > 3 && elem.value ?
                                    <span
                                        key={elem.value}
                                        className={`skill-plate additional rounded-3`.concat(userHasSkill(elem.value) ? ' has' : '')}>
                                        {elem.value}
                                    </span> : <></>
                            )}
                        </div>
                    </div>
                    <div className="col-4">
                        <h5 className="text-center">Рівень англійської мови</h5>
                        <span>Ваш Рівень англійської мови <b>{valueToEnglishLevel[userData.englishLevel]} - {getAverageLevel(stats.english) <= parseInt(userData.englishLevel) ? 'вище' : 'нижче'}</b> ніж зазвичай вимагається</span>
                        <ul className="mt-2">
                            {sortEnglishLevels(stats.english).map((elem, i) =>
                                <li
                                    key={elem.value}> <b>{elem.value}</b>
                                    {` вимагається в ${elem.count} ${elem.count == 1 ? "вакансії" : "вакансіях"}`}
                                </li>
                            )}
                        </ul>
                    </div>
                </ContentBox>
                <ContentBox className="w-100 row m-0">
                    <div className="col-5">
                        <h5 className="text-center mt-1">Заробітна плата</h5>
                        <Bar options={optionsSalaries} data={statsToBarChart(stats.salaries.basedOnExperience, barCharts.SALARIES)} />

                        <span>{`Середня ставка по вакансіям: `}<b>{`$${stats.salaries?.median}` ?? 'інформація не знайдена'}</b></span>
                        <br />
                        <span>{`Найвища пропонована платня: `}<b>{`$${stats.salaries?.maxSalary}` ?? 'інформація не знайдена'}</b></span>
                    </div>
                    <div className="col-7">
                        <UkraineMap stats={stats} />
                        {stats.location.countries.map((elem, i) =>
                            elem.value === "Abroad" ?
                                <p className="text-center">
                                    {`Також`}
                                    <b>{` ${elem.count} ${elem.count == 1 ? "вакансія" : "вакансій"} `} </b>
                                    {`пропонують роботу за кордоном`}
                                </p> : <></>
                        )}
                    </div>
                </ContentBox>
            </div>
            : <></>
    )
}

export default PositionStatistics