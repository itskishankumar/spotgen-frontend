import { Offline, Online } from "react-detect-offline"
import *  as CONSTANTS from '../utils/constants'

// using a library to check whether device is online or offline. it polls a url every fews seconds
export default function MainContentWrapper({ props }) {
    return (
        <div className='h-full'>
            <Online>{props}</Online>
            <Offline>
                <div>
                    <p className='text-xl text-white font-bold mb-4'>{CONSTANTS.OFFLINE_MESSAGE}</p>
                </div >
            </Offline >
        </div >
    )
}
