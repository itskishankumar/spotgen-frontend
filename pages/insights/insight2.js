import React from 'react'
import { useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import *  as CONSTANTS from '../../utils/constants'
import Router from 'next/router'
import LoadingSpinner from '../../components/loading_spinner'
import getErrorMessage from '../../utils/helper'
import { getArtistLongestReleaseSpans } from '../../core/repository'

const ChartWrapper = dynamic(
    () => import('../../components/chart_wrapper'),
    { ssr: false }
)

export default function Insight2({ isDynamic = true }) {
    const staticChartOptions = {
        maintainAspectRatio: false,
        indexAxis: 'y',
        scales: {
            x: {
                beginAtZero: false,
            },
        },
        plugins: {
            datalabels: {
                display: false,
            },
            legend: {
                display: false
            },
        },
        events: [],
    }

    const dynamicChartOptions = {
        maintainAspectRatio: false,
        responsive: true,
        indexAxis: 'y',
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
            legend: {
                display: false
            },
            datalabels: {
                display: false
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    title: function (tooltipItems) {
                        return `Longest gap b/w album releases : ${tooltipItems[0].formattedValue}`;
                    },
                    label: function (tooltipItems) {
                        return '';
                    },
                },
                titleFontSize: 22,
                bodyFontSize: 22,
            },
            title: {
                display: true,
                text: 'Artists with the longest gap between releases',
                font: {
                    weight: 'bold',
                    size: 20
                }
            },
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Artists',
                    font: {
                        weight: 'bold',
                        size: 20
                    }
                },
                grid: {
                    display: false
                },
            },
            x: {
                beginAtZero: false,
                title: {
                    display: true,
                    text: 'Range between first and latest album!',
                    font: {
                        weight: 'bold',
                        size: 20
                    },
                    padding: 30,
                },
                grid: {
                    display: true
                }
            },
        },
    }

    const { data, error, isLoading } = useQuery({
        queryKey: ['artistLongestReleaseSpans'],
        queryFn: getArtistLongestReleaseSpans,
        staleTime: Infinity,
        select: (data) => {
            let artistsNames = []
            let artistsData = []
            let idList = []
            data?.forEach(dat => {
                artistsNames.push(dat.artist_name)
                artistsData.push([dat.release_first, dat.release_last])
                idList.push(dat.artist_id)
            })
            return {
                labels: artistsNames,
                datasets: [
                    {
                        label: 'Longest gap b/w album releases',
                        data: artistsData,
                        idList: idList,
                        backgroundColor: ['#003f5c', '#2f4b7c', '#665191', '#a05195', '#d45087', '#f95d6a', '#ff7c43', '#ffa600'],
                        borderColor: 'blue',
                        fill: true,
                    }
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
        <div className='h-full flex flex-row gap-5'>
            {isDynamic
                ? <ChartWrapper type={CONSTANTS.BAR_CHART} data={data} chartOptions={dynamicChartOptions} />
                : <ChartWrapper type={CONSTANTS.BAR_CHART} data={data} chartOptions={staticChartOptions} />
            }
        </div>
    )
}

