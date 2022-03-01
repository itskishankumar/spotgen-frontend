import *  as CONSTANTS from '../utils/constants'

// custom 404 page
export default function Custom404() {
    return (
        <div>
            <p className='text-xl text-white font-bold mb-4'>{CONSTANTS.NETWORK_ERROR_MESSAGE}</p>
        </div>
    )
}