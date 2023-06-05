import { FC, useEffect, useRef, useState } from "react";

import HighchartsReact from 'highcharts-react-official'
import * as Highcharts from 'highcharts/highmaps';
import mapDataUkraine from '@highcharts/map-collection/countries/ua/ua-all.geo.json';
import { PositionStats } from "../services/PositionService";
import { fillMapDataUkraine } from "../utils/locations";



interface Props {
    className?: string;
    chartProps?: HighchartsReact.Props;
    stats: PositionStats
}




const UkraineMap: FC<Props> = ({ stats, ...props }) => {

    const [options, setOptions] = useState<Highcharts.Options>()

    useEffect(() => {
        const opts: Highcharts.Options = {
            title: {
                text: 'Розподіл вакансій по регіонам'
            },
            colorAxis: {
                min: 0
            },
            series: [{
                states: {
                    hover: {
                        color: '#BADA55'
                    }
                },
                type: 'map',
                mapData: mapDataUkraine,
                data: fillMapDataUkraine(stats.location.cities),
            }]
        }
        setOptions(opts)
    }, []);

    return (
        <div id='mapChart'>
            <HighchartsReact
                options={options}
                highcharts={Highcharts}
                constructorType={'mapChart'}
                {...props.chartProps}
            />
        </div>
    )

}

export default UkraineMap