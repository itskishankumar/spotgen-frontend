import { Bar, Pie, Line } from 'react-chartjs-2'
import Chart from 'chart.js/auto'
import zoomPlugin from 'chartjs-plugin-zoom'
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.register(zoomPlugin)
Chart.register(ChartDataLabels);
import *  as CONSTANTS from '../utils/constants'

// creating a chart wrapper cause the zoom plugin used here needs a browser window object to register. so will non-ssr load this component
export default function ChartWrapper({ type, data, chartOptions }) {
    return (
        <div className='h-full flex-1 bg-white rounded-3xl p-5'>
            {
                (() => {
                    switch (type) {
                        case CONSTANTS.LINE_CHART:
                            return <Line
                                data={data}
                                options={chartOptions}
                            />
                        case CONSTANTS.BAR_CHART:
                            return <Bar
                                data={data}
                                options={chartOptions}
                            />
                        case CONSTANTS.PIE_CHART:
                            return <Pie
                                data={data}
                                options={chartOptions}
                            />
                    }
                })()
            }
        </div>

    )
}