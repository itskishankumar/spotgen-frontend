import *  as CONSTANTS from '../utils/constants'

// utility class to set a error message
export default function getErrorMessage(error) {
    if (error == CONSTANTS.NETWORK_ERROR) {
        return CONSTANTS.NETWORK_ERROR_MESSAGE
    } else if (error == CONSTANTS.NETWORK_FAILURE) {
        return CONSTANTS.NETWORK_FAILURE_MESSAGE
    } else if (error == CONSTANTS.INVALID_SEARCH_INPUT_ERROR) {
        return CONSTANTS.INVALID_SEARCH_INPUT_MESSAGE
    }
    else if (error == CONSTANTS.SEARCH_RETURNED_EMPTY_ERROR) {
        return CONSTANTS.SEARCH_EMPTY_MESSAGE
    }
}
