import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getGenresWithMostArtists } from '../../core/repository'
import dynamic from 'next/dynamic'
import *  as CONSTANTS from '../../utils/constants'
import LoadingSpinner from '../../components/loading_spinner'
import getErrorMessage from '../../utils/helper'

const ChartWrapper = dynamic(
    () => import('../../components/chart_wrapper'),
    { ssr: false }
)

export default function Insight3({ isDynamic = true }) {
    const staticChartOptions = {
        maintainAspectRatio: false,
        plugins: {
            datalabels: {
                display: false,
            },
            legend: {
                display: false,
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
                    text: 'Artist count',
                    font: {
                        weight: 'bold',
                        size: 20
                    }
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Genres',
                    font: {
                        weight: 'bold',
                        size: 20
                    }
                }
            }
        },
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Genres with the most no of Artists',
                font: {
                    weight: 'bold',
                    size: 20
                }
            },
            datalabels: {
                display: false,
            },
        },
    }

    const { data, error, isLoading } = useQuery({
        queryKey: ['genresWithMostArtists'],
        queryFn: getGenresWithMostArtists,
        staleTime: Infinity,
        select: (data) => {
            let genres = []
            let noOfArtists = []
            data?.forEach(dat => {
                genres.push(dat.genre)
                noOfArtists.push(dat.noOfArtists)
            })
            return {
                labels: genres,
                datasets: [
                    {
                        label: 'No of Artists',
                        data: noOfArtists,
                        backgroundColor: ['#14532d', '#facc15', '#8b5cf6', '#16a34a', '#b91c1c', '#4ade80', '#312e81', '#f43f5e', '#44403c'],
                        borderColor: ['#14532d', '#facc15', '#8b5cf6', '#16a34a', '#b91c1c', '#4ade80', '#312e81', '#f43f5e', '#44403c'],
                    },
                ]
            }
        }
    })

    if (isLoading) {
        return <LoadingSpinner />
    }
    if (error) {
        return (
            <div>
                <p className='text-xl text-white font-bold mb-4'>{getErrorMessage(error)}</p>
            </div>
        )
    }

    return (
        <div className='h-full'>
            {isDynamic
                ? <ChartWrapper type={CONSTANTS.BAR_CHART} data={data} chartOptions={dynamicChartOptions} />
                : <ChartWrapper type={CONSTANTS.BAR_CHART} data={data} chartOptions={staticChartOptions} />
            }
        </div>
    )
}

