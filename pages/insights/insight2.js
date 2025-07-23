import React, { useState, useEffect } from 'react'
import Repository from '../../core/repository'
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

// top 10 artists w longest gap between album releases
export default function Insight2({ isDynamic = true }) {

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
        onClick: (_, element) => {
            if (element.length > 0) {
                var ind = element[0].index;
                Router.push({
                    pathname: '/artist/[id]',
                    query: { id: chartData.datasets[0].idList[ind] },
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

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await getArtistLongestReleaseSpans()
            let artistsNames = []
            let artistsData = []
            let idList = []
            if (data != null) {
                data.forEach(dat => {
                    artistsNames.push(dat.artist_name)
                    artistsData.push([dat.release_first, dat.release_last])
                    idList.push(dat.artist_id)
                })
            }
            setResponse({
                chartData: {
                    labels: artistsNames,
                    datasets: [{
                        label: 'Longest gap b/w album releases',
                        data: artistsData,
                        idList: idList,
                        backgroundColor: ['#003f5c', '#2f4b7c', '#665191', '#a05195', '#d45087', '#f95d6a', '#ff7c43', '#ffa600'],
                        borderColor: 'blue',
                        fill: true,
                    }]
                },
                error: error,
                loading: false,
            })
        }
        fetchData()
    }, [])

    return (
        <div className='h-full flex flex-row gap-5'>
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
                            ? <ChartWrapper type={CONSTANTS.BAR_CHART} data={response.chartData} chartOptions={dynamicChartOptions} />
                            : <ChartWrapper type={CONSTANTS.BAR_CHART} data={response.chartData} chartOptions={staticChartOptions} />
            }
        </div>
    )

}

