import React, { useState, useEffect } from 'react'
import Repository from '../../core/repository'
import dynamic from 'next/dynamic'
import *  as CONSTANTS from '../../utils/constants'
import LoadingSpinner from '../../components/loading_spinner'
import getErrorMessage from '../../utils/helper'
import { useRef } from 'react';
import { Line } from 'react-chartjs-2'


const ChartWrapper = dynamic(
    () => import('../../components/chart_wrapper'),
    { ssr: false }
)

// avg features in tracks
export default function Insight1({ isDynamic = true }) {

    const [response, setResponse] = useState({
        chartData: {
            labels: [],
            datasets: [{
                label: '',
                data: [],
            }]
        },
        error: null,
        loading: true,
    })

    const ref = useRef();

    const staticChartOptions = {
        maintainAspectRatio: false,
        plugins: {
            datalabels: {
                display: false
            },
        },
        events: [],
    }

    const dynamicChartOptions = {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Feature Value',
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Years',
                }
            }
        },
        plugins: {
            zoom: {
                zoom: {
                    wheel: {
                        enabled: true,
                        speed: .2,
                    },
                    drag: {
                        enabled: false,
                    },
                    pinch: {
                        enabled: true
                    },
                    mode: 'xy',
                    overScaleMode: 'xy',
                },
                pan: {
                    enabled: true,
                },
                limits: {
                    y: { min: -20, max: 10 },
                    x: { min: 0, max: 2019 }
                },

            },
            datalabels: {
                display: false
            },
        },
    }

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await Repository.getAudioTrendsOverTimeUrl()
            let acousticnessValues = []
            let danceabilityValues = []
            let speechinessValues = []
            let valenceValues = []
            let loudnessValues = []
            let energyValues = []
            let livenessValues = []
            let instrumentalnessValues = []
            let durationValues = []
            let years = []
            if (data != null) {
                data.forEach(dat => {
                    acousticnessValues.push(dat.avgAcousticness)
                    danceabilityValues.push(dat.avgDanceability)
                    speechinessValues.push(dat.avgSpeechiness)
                    durationValues.push(dat.avgDuration)
                    valenceValues.push(dat.avgValence)
                    loudnessValues.push(dat.avgLoudness)
                    energyValues.push(dat.avgEnergy)
                    livenessValues.push(dat.avgLiveness)
                    instrumentalnessValues.push(dat.avgInstrumentalness)
                    years.push(dat.year)
                })
            }
            setResponse({
                chartData: {
                    labels: years,
                    datasets: [
                        {
                            label: 'Acousticness',
                            data: acousticnessValues,
                            backgroundColor: '#14532d',
                            borderColor: '#14532d',
                            tension: 0.5,
                        },
                        {
                            label: 'Danceability',
                            data: danceabilityValues,
                            backgroundColor: '#facc15',
                            borderColor: '#facc15',
                            tension: 0.5,
                        },
                        {
                            label: 'Speechiness',
                            data: speechinessValues,
                            backgroundColor: '#8b5cf6',
                            borderColor: '#8b5cf6',
                            tension: 0.5,
                        },
                        {
                            label: 'Duration',
                            data: durationValues,
                            backgroundColor: '#16a34a',
                            borderColor: '#16a34a',
                            hidden: true,
                            tension: 0.5,
                        },
                        {
                            label: 'Valence',
                            data: valenceValues,
                            backgroundColor: '#b91c1c',
                            borderColor: '#b91c1c',
                            tension: 0.5,
                        },
                        {
                            label: 'Loudness',
                            data: loudnessValues,
                            backgroundColor: '#4ade80',
                            borderColor: '#4ade80',
                            hidden: true,
                            tension: 0.5,
                        },
                        {
                            label: 'Energy',
                            data: energyValues,
                            backgroundColor: '#312e81',
                            borderColor: '#312e81',
                            tension: 0.5,
                        },
                        {
                            label: 'Liveness',
                            data: livenessValues,
                            backgroundColor: '#f43f5e',
                            borderColor: '#f43f5e',
                            tension: 0.5,
                        },
                        {
                            label: 'Instrumentalness',
                            data: instrumentalnessValues,
                            backgroundColor: '#44403c',
                            borderColor: '#44403c',
                            tension: 0.5,
                        },
                    ]
                },
                error: error,
                loading: false,
            }
            )
        }
        fetchData()
    }, [])

    async function obs1() {
        let mychart = ref.current;
        mychart.hide(1);
        mychart.hide(2);
        mychart.hide(3);
        mychart.hide(4);
        mychart.hide(5);
        mychart.hide(7);
        mychart.hide(8);

        mychart.show(0);
        mychart.show(6);

        mychart.update();
    }

    async function obs2() {
        let mychart = ref.current;
        mychart.hide(0);
        mychart.hide(1);
        mychart.hide(2);
        mychart.hide(3);
        mychart.hide(4);
        mychart.hide(5);
        mychart.hide(6);

        mychart.show(7);
        mychart.show(8);

        mychart.update();
    }

    async function obs3() {
        let mychart = ref.current;
        mychart.hide(0);
        mychart.hide(2);
        mychart.hide(3);
        mychart.hide(5);
        mychart.hide(6);
        mychart.hide(7);
        mychart.hide(8);

        mychart.show(1);
        mychart.show(4);

        mychart.update();
    }

    function obs4() {
        let mychart = ref.current;
        mychart.hide(0);
        mychart.hide(1);
        mychart.hide(3);
        mychart.hide(4);
        mychart.hide(5);
        mychart.hide(6);
        mychart.hide(7);

        mychart.show(2);
        mychart.show(8);

        mychart.update();
    }



    return (
        <div className='h-full'>
            {
                response.loading
                    ?
                    <LoadingSpinner />
                    :
                    response.error != null
                        ?
                        <div>
                            <p className='text-xl text-white font-bold mb-4'>{getErrorMessage(response.error)}</p>
                        </div>
                        :
                        isDynamic
                            ?
                            <div className='h-full flex flex-row gap-5'>
                                <div className='w-9/12'>
                                    {/* not using chart wrapper here, cause need to attach a ref obj to the chart */}
                                    <div className='h-full flex-1 bg-white rounded-3xl p-5'>
                                        <Line
                                            data={response.chartData}
                                            ref={ref}
                                            options={dynamicChartOptions}
                                        />
                                    </div>
                                </div>
                                <div className='w-3/12 h-full flex flex-col justify-start items-center gap-10'>
                                    <p className='text-3xl font-semibold text-white'> Average feature values by year</p>
                                    <p className='text-xl self-start text-white'> The values have been pulled from every single track and averaged out based on the release year. Hover over the respective axis to zoom into them.</p>

                                    <div className='self-start' >
                                        <div className='flex flex-row gap-5 items-center mb-5'>
                                            <p className='text-xl text-white font-semibold'> OBSERVATION 1</p>
                                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => obs1()}>
                                                SHOW
                                            </button>
                                        </div>
                                        <p className='text-white font-semibold'> As the average ACOUSTICNESS falls, the average ENERGY increases. This is especially prominent from 1950 to 1970. From 1970 to 2018, for every drop in acousticness there is a rise in energy.</p>
                                    </div>

                                    <div className='self-start '>
                                        <div className='flex flex-row gap-5 items-center mb-5'>
                                            <p className='text-xl text-white font-semibold'> OBSERVATION 2</p>
                                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => obs2()}>
                                                SHOW
                                            </button>
                                        </div>
                                        <p className='text-white font-semibold'> INSTRUMENTALNESS and LIVENESS show a similar inverse relation as in Observation 1. They mirror each other in their rise and file.</p>
                                    </div>

                                    <div className='self-start '>
                                        <div className='flex flex-row gap-5 items-center mb-5'>
                                            <p className='text-xl text-white font-semibold'> OBSERVATION 3</p>
                                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => obs3()}>
                                                SHOW
                                            </button>
                                        </div>
                                        <p className='text-white font-semibold'> DANCEABILITY and VALENCE have very close values throughout the years. They accompany each other in rises and falls. This shows that the DANCEABILITY of a song is usually related to the valence/positivty.</p>
                                    </div>

                                    <div className='self-start '>
                                        <div className='flex flex-row gap-5 items-center mb-5'>
                                            <p className='text-xl text-white font-semibold'> OBSERVATION 4</p>
                                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => obs4()}>
                                                SHOW
                                            </button>
                                        </div>
                                        <p className='text-white font-semibold'> Similar to Obs 3, INSTRUMENTALNESS and SPEECHINES have very close values throughout the years. They accompany each other in rises and falls.</p>
                                    </div>

                                </div>
                            </div>
                            :
                            <ChartWrapper type={CONSTANTS.LINE_CHART} data={response.chartData} chartOptions={staticChartOptions} />
            }
        </div>
    )
}

