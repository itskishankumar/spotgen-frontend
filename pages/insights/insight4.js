import { useState,useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getTop10Genres, getPopularArtistsOfGenre } from '../../core/repository'
import dynamic from 'next/dynamic'
import *  as CONSTANTS from '../../utils/constants'
import Router from 'next/router'
import LoadingSpinner from '../../components/loading_spinner'
import getErrorMessage from '../../utils/helper'

const ChartWrapper = dynamic(
    () => import('../../components/chart_wrapper'),
    { ssr: false }
)

export default function Insight4({ isDynamic = true }) {
    const [selectedGenre, setSelectedGenre] = useState(null)

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
        onClick: (_, element, chart) => {
            if (element.length > 0 && chart) {
                var ind = element[0].index;
                const idList = chart.data.datasets[0].idList;
                Router.push({
                    pathname: '/artist/[id]',
                    query: { id: idList[ind] },
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


    // Fetch genres
    const { data: genreData, error: genreError, isLoading: genreLoading } = useQuery({
        queryKey: ['top10Genres'],
        queryFn: getTop10Genres,
        staleTime: Infinity,
    })

    // Set default selected genre after genres are loaded
    useEffect(() => {
        if (genreData && !selectedGenre) {
            setSelectedGenre(genreData[0]?.genre)
        }
    }, [genreData, selectedGenre])

    // Fetch artists for selected genre
    const {
        data: chartData,
        error: artistError,
        isLoading: artistLoading
    } = useQuery({
        queryKey: ['popularArtistsOfGenre', selectedGenre],
        queryFn: () => getPopularArtistsOfGenre(selectedGenre),
        enabled: !!selectedGenre,
        staleTime: Infinity,
        select: (data) => {
            let namesList = []
            let followersList = []
            let popularityList = []
            let idList = []
            data.forEach(dat => {
                namesList.push(dat.artist_name)
                followersList.push(dat.artist_followers)
                popularityList.push(dat.artist_popularity)
                idList.push(dat.id)
            })
            return {
                labels: namesList,
                genreName: selectedGenre,
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
            }
        }
    })
 
    if (genreError) {
        return (
            <div>
                <p className='text-xl text-white font-bold mb-4'>{getErrorMessage(genreError)}</p>
            </div>
        )
    }
    if (artistError) {
        return (
            <div>
                <p className='text-xl text-white font-bold mb-4'>{getErrorMessage(artistError)}</p>
            </div>
        )
    }

    return (
        <div className='h-full'>
            {isDynamic
                ?
                <div className='h-full flex flex-row gap-5'>
                    {artistLoading ? <div  className="flex-1 flex justify-center items-center"><LoadingSpinner/></div> : <ChartWrapper type={CONSTANTS.PIE_CHART} data={chartData} chartOptions={dynamicChartOptions} />}
                    {genreLoading ?  <div  className="flex-1 flex justify-center items-center"><LoadingSpinner/></div> : 
                    <div className='flex-1 h-full flex flex-col justify-start items-center gap-10'>
                        <p className='text-3xl font-semibold text-white'> Top 5 Artists of a Genre based on followers</p>
                        <div className='grid grid-cols-2 grid-rows-2 gap-5'>
                            {genreData && genreData.map((data) => (
                                <div
                                    key={data.genre}
                                    className={
                                        chartData && chartData.genreName === data.genre ?
                                            'flex-none flex justify-center items-center h-32 w-52 bg-gradient-to-b from-black-900 to-blue-600 mr-5 rounded-xl p-4 hover:from-black' :
                                            'flex-none flex justify-center items-center h-32 w-52 bg-gradient-to-b from-blue-900 to-blue-600 mr-5 rounded-xl p-4 hover:from-black'
                                    }
                                    onClick={() => setSelectedGenre(data.genre)}
                                >
                                    <p className="line-clamp-3 text-l text-white font-semibold">{data.genre}</p>
                                </div>
                            ))}
                        </div>
                    </div>}
                </div>
                : artistLoading? <LoadingSpinner/> : <ChartWrapper type={CONSTANTS.PIE_CHART} data={chartData} chartOptions={staticChartOptions} />
            }
        </div>
    )
}