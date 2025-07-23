import *  as CONSTANTS from '../utils/constants'

export async function GET(url) {
    try {
        const response = await fetch(url)
        if (response.status === 200) {
            return response.json()
        } else {
            throw new Error(CONSTANTS.NETWORK_ERROR)
        }
    } catch (e) {
        throw new Error(CONSTANTS.NETWORK_FAILURE)
    }
}





