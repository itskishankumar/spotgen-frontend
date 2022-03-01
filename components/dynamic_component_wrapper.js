import LoadingSpinner from '../components/loading_spinner'
import getErrorMessage from '../utils/helper'

export default function DynamicComponentWrapper({ response, children }) {
    return (
        <div>
            {response.loading
                ?
                <LoadingSpinner />
                :
                response.error != null
                    ?
                    <div>
                        <p className='text-xl text-white font-bold mb-4'>{getErrorMessage(response.error)}</p>
                    </div>
                    : children
            }
        </div>
    )
}