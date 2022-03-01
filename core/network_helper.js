import *  as CONSTANTS from '../utils/constants'

export async function GET(url) {
    try {
        const response = await fetch(url)
        if (response.status == 200) {
            return { data: await response.json(), error: null }
        } else {
            return { data: null, error: CONSTANTS.NETWORK_ERROR }
        }
    } catch (e) {
        return { data: null, error: CONSTANTS.NETWORK_FAILURE }
    }
}





