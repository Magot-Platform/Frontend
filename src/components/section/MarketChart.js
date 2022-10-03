import { useState, useEffect } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import api from '../../utils/api';
import { Bars } from 'react-loader-spinner';

const MarketChart = () =>{

    const [marketInfo, setMarketInfo] = useState([]);
    const [options, setOptions] = useState({});
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            setLoading(true);

            const res = await api.get('/markets');
            const data = await res.data;
            setMarketInfo(data);

            setLoading(false);
        }

        getData();
    }, [])

    useEffect(() => {
        if (marketInfo && marketInfo.prices) {
            var ohlc = [],
            volume = [],
            dataLengthA = marketInfo.prices.length,
            dataLengthB = marketInfo.total_volumes.length,
            groupingUnits = [
                [
                    'hour',
                    [1, 24]
                ],
                [
                    'day',
                    [1, 7]
                ],
                [
                    'week', // unit name
                    [1] // allowed multiples
                ],
                [
                    'month', 
                    [1, 2, 3, 4, 6]
                ]
            ],
            i = 0;
    
            for (i; i < dataLengthA; i += 1) {
                ohlc.push([
                    marketInfo.prices[i][0], // the date
                    marketInfo.prices[i][1], // open
                ]);
            }
            for (i=0; i < dataLengthB; i += 1) {
                volume.push([
                    marketInfo.total_volumes[i][0], // the date
                    marketInfo.total_volumes[i][1] // the volume
                ]);
            }
            const options = {
                rangeSelector: {
                    selected: 1
                },
    
                title: {
                    text: new Date().toISOString().slice(0, 10)
                },
    
                yAxis: [
                    {
                        labels: {
                            align: 'right',
                            x: -3
                        },
                        title: {
                            text: 'Price'
                        },
                            height: '80%',
                            lineWidth: 2,
                            resize: {
                                enabled: true
                            }
                    },
                    {
                        labels: {
                            align: 'right',
                            x: -3
                        },
                        title: {
                            text: 'Volume'
                        },
                        top: '80%',
                        height: '20%',
                        offset: 0,
                        lineWidth: 2
                    }
                ],
    
                tooltip: {
                    split: true
                },
                chart: {
                    type: 'area',
                    height: 600,
                    width: 1200            
                },
                legend: {
                    enabled: true
                },
                plotOptions: {
                    line: {
                        crisp: true,
                        pointInterval: 100
                    },
                    series: {
                        color: '#D47A09'
                    }
                },
                series: [
                    {
                        type: 'line',
                        name: 'AAPL',
                        data: ohlc,
                        dataGrouping: {
                            units: groupingUnits
                        }
                    },
                    {
                        type: 'column',
                        name: 'Volume',
                        data: volume,
                        yAxis: 1,
                        dataGrouping: {
                            units: groupingUnits
                        }
                    }
                ]
            };

            setOptions(options);

        }
    }, [marketInfo]);

    return (
        <div className='dark:bg-slate-800'>
        { isLoading && isLoading === true ? (
            <div className='m-auto w-max'>
                <Bars heigth='100' width='100' color='orange' ariaLabel='loading-indicator' />
            </div>) :
            <HighchartsReact
                highcharts={Highcharts}
                constructorType={'stockChart'}
                options={options}
            />
        }
        </div>
    );
}

export default MarketChart;
