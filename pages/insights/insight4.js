import React, { useState, useEffect } from 'react'
import { getPopularArtistsOfGenre, getTop10Genres } from '../../core/repository'
import dynamic from 'next/dynamic'
import *  as CONSTANTS from '../../utils/constants'
import Router from 'next/router'
import LoadingSpinner from '../../components/loading_spinner'
import getErrorMessage from '../../utils/helper'

const ChartWrapper = dynamic(
    () => import('../../components/chart_wrapper'),
    { ssr: false }
)

// top 5 artists of each genre
export default function Insight4({ isDynamic = true }) {

    const [response, setResponse] = useState({
        chartData: {
            labels: [],
            datasets: [{
                label: '',
                data: [],
            }],
            genreName: '',
        },
        error: null,
        loading: true,
    })

    const [genreData, setGenreData] = useState([])

    const staticChartOptions = {
        maintainAspectRatio: true,
        events: [],
        plugins: {
            datalabels: {
                formatter: function (value, context) {
                    return context.chart.data.labels[context.dataIndex];
                },
                color: 'white',
                labels: {
                    title: {
                        font: {
                            weight: 'bold',
                            size: 22,
                        }
                    },
                }
            },
            legend: {
                labels: {
                    font: {
                        size: 16
                    }
                }
            },
        }
    }

    const dynamicChartOptions = {
        maintainAspectRatio: false,
        onClick: (_, element) => {
            if (element.length > 0) {
                var ind = element[0].index;
                Router.push({
                    pathname: '/artist/[id]',
                    query: { id: response.chartData.datasets[0].idList[ind] },
                })
            }
        },
        plugins: {
            datalabels: {
                formatter: function (value, context) {
                    return context.chart.data.labels[context.dataIndex];
                },
                color: 'white',
                labels: {
                    title: {
                        font: {
                            weight: 'bold',
                            size: 22,
                        }
                    },
                }
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
                callbacks: {
                    title: function (tooltipItems) {
                        return tooltipItems[0].label;
                    },
                    label: function (tooltipItems) {
                        return `Followers : ${tooltipItems.formattedValue}`;
                    },
                },
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
            const { data, error } = await getTop10Genres()
            if (error != null) {
                setResponse({
                    error: error,
                })
            }
            if (data != null) {
                setGenreData(data)
                await fetchGenreArtists(data[0]['genre'])
            }
        }
        fetchData()
    }, [])

    async function fetchGenreArtists(genreName) {
        const { data, error } = await getPopularArtistsOfGenre(genreName)
        let namesList = []
        let followersList = []
        let popularityList = []
        let idList = []
        if (data != null) {
            data.forEach(dat => {
                namesList.push(dat.artist_name)
                followersList.push(dat.artist_followers)
                popularityList.push(dat.artist_popularity)
                idList.push(dat.id)
            })
        }
        setResponse({
            chartData: {
                labels: namesList,
                genreName: genreName,
                datasets: [
                    {
                        label: 'No of followers',
                        data: followersList,
                        backgroundColor: ['#003f5c', '#58508d', '#bc5090', '#ff6361', '#ffa600'],
                        borderColor: ['white'],
                        popularityList: popularityList,
                        idList: idList,
                    },
                ],
            },
            error: error,
            loading: false,
        })
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
                            < div className='h-full flex flex-row gap-5'>
                                <ChartWrapper type={CONSTANTS.PIE_CHART} data={response.chartData} chartOptions={dynamicChartOptions} />
                                <div className='flex-1 h-full flex flex-col justify-start items-center gap-10'>
                                    <p className='text-3xl font-semibold text-white'> Top 5 Artists of a Genre based on followers</p>
                                    <div className='grid grid-cols-2 grid-rows-2 gap-5'>
                                        {
                                            genreData.map((data) => {
                                                // eslint-disable-next-line react/jsx-key
                                                return <div
                                                    className={
                                                        response.chartData.genreName === data.genre ?
                                                            'flex-none flex justify-center items-center h-32 w-52 bg-gradient-to-b from-black-900 to-blue-600 mr-5 rounded-xl p-4 hover:from-black' :
                                                            'flex-none flex justify-center items-center h-32 w-52 bg-gradient-to-b from-blue-900 to-blue-600 mr-5 rounded-xl p-4 hover:from-black'
                                                    }
                                                    onClick={() => fetchGenreArtists(data.genre)}
                                                >
                                                    <p className="line-clamp-3 text-l text-white font-semibold">{data.genre}</p>
                                                </div>
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                            : <ChartWrapper type={CONSTANTS.PIE_CHART} data={response.chartData} chartOptions={staticChartOptions} />
            }
        </div >
    )
}