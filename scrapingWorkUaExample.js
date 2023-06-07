import fetch from 'node-fetch';
import { parse } from 'node-html-parser';

const func = async () =>   {
    let response = await fetch(
        "https://www.work.ua/jobs-kyiv-%D0%B1%D1%83%D1%85%D0%B3%D0%B0%D0%BB%D1%82%D0%B5%D1%80/"
    )
    
    let html = await response.text();

    const root = parse(html);

    const numberOfRatingsElement = root.querySelector("#pjax-job-list > div:nth-child(6) > div:nth-child(3) > b")
    // const numberOfRatingText = numberOfRatingsElement.textContent;
    console.log(numberOfRatingsElement.textContent);
   
}

func()