import React, { useState, useEffect, useContext } from 'react'
import { getTracksPopularityInsight } from '../../core/repository'
import dynamic from 'next/dynamic'
import *  as CONSTANTS from '../../utils/constants'
import LoadingSpinner from '../../components/loading_spinner'
import getErrorMessage from '../../utils/helper'

const ChartWrapper = dynamic(
    () => import('../../components/chart_wrapper'),
    { ssr: false }
)

// tracks popularity insight
export default function Insight5({ isDynamic = true }) {

    const [response, setResponse] = useState({
        chartData: {
            labels: [],
            datasets: [{
                label: '',
                data: [],
            }],
        },
        error: null,
        loading: true,
    })

    const staticChartOptions = {
        maintainAspectRatio: false,
        events: [],
        plugins: {
            datalabels: {
                display: false,
            },
            legend: {
                display: false
            },
        },
    }

    const dynamicChartOptions = {
        maintainAspectRatio: false,
        responsive: true,
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
                    y: { min: 0, max: 100 },
                    x: { min: 0, max: 2019 }
                },

            },
            datalabels: {
                display: false,
            },
            legend: {
                labels: {
                    font: {
                        size: 16
                    }
                }
            },
            tooltip: {
                enabled: true,
                titleFontSize: 24,
                bodyFontSize: 22,
                displayColors: false,
                padding: 10,
                bodySpacing: 4,
            }
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await getTracksPopularityInsight()
            let years = []
            let artist_popularity = []
            let deviations_from_avg = []
            if (data != null) {
                data.forEach((dat) => {
                    artist_popularity.push(dat.artist_popularity)
                    years.push(dat.year)
                    deviations_from_avg.push(dat.normalizedDeviationFromAvg)
                })
            }
            setResponse({
                chartData: {
                    labels: years,
                    datasets: [
                        {
                            label: 'Popularity of the artist of the most popular track',
                            data: artist_popularity,
                            backgroundColor: '#7a5195',
                            borderColor: '#7a5195',
                            tension: .5,
                        },
                        {
                            label: 'Deviation of the most popular track from the average features for the year',
                            data: deviations_from_avg,
                            backgroundColor: '#ef5675',
                            borderColor: '#ef5675',
                            tension: .5,
                        }
                    ]
                },
                error: error,
                loading: false,
            })
        }
        fetchData()
    }, [])

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
                                    <ChartWrapper type={CONSTANTS.LINE_CHART} data={response.chartData} chartOptions={dynamicChartOptions} />
                                </div>

                                <div className='flex-1 h-full flex flex-col justify-start items-center gap-10'>
                                    <p className='text-3xl font-semibold text-white'> What influenced a tracks popularity?</p>
                                    <p className='self-start font-semibold text-white'> Here, we have considered the most popular track for each year.</p>
                                    <div>
                                        <p className='self-start font-semibold text-white'> We then consider the popularity of the Artist of that track, and see that, as the decades go by, the popularity of the artist goes up. Which indicates that the influence of the artist popularity on a tracks popularity also goes up.</p>
                                        <p className='self-start font-semibold text-white text-color-red opcaity-50'> PS: This is assuming that the popularity of an artist was calculated relative to their year, and not on a century scale.</p>
                                    </div>
                                    <p className='self-start font-semibold text-white'> We have also considered the deviation of the features of that track from the average features of all the tracks for that year i.e how close it sounded to the common music of that time. We see that, in some time-frames, likes 1940 - 1960, both deviation and artist popularity shot up. Meaning, the tracks were influenced more by the popularity of the artist, and less by how close their features were to the year average.</p>
                                    <p className='self-start font-semibold text-white'> Between 1996 and 2010, the deviations come down, and so does the artist popularity. They are proportianal in this time. This indicates that the popular music was influenced by how close it sounded to the common music of that time, rather than the artist popularity.</p>
                                    <p className='self-start font-semibold text-white'> We also see that after 1948, the deviations rose meaning, popular music started being very experimental, and also that from 2014-2016, the deviations did not fluctuate much, meaning that popular music became less experimental.</p>
                                </div>
                            </div>
                            : <ChartWrapper type={CONSTANTS.LINE_CHART} data={response.chartData} chartOptions={staticChartOptions} />
            }
        </div >
    )
}