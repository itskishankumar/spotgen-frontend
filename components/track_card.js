import Link from 'next/link'
import *  as CONSTANTS from '../utils/constants'

export default function TrackCard({ track, disabled = false }) {
    return (
        disabled ?
            <div className='flex-none flex justify-center items-center h-32 w-52 bg-gradient-to-b from-blue-900 to-blue-600 mr-5 rounded-xl p-4'>
                <p className="line-clamp-3 text-l text-white font-semibold">{track.name}</p>
            </div> :
            <Link href={`${CONSTANTS.albumPage}/${track.album_id}`} >
                <a href={`${CONSTANTS.albumPage}/${track.album_id}`}>
                    <div className='flex-none flex justify-center items-center h-32 w-52 bg-gradient-to-b from-blue-900 to-blue-600 mr-5 rounded-xl p-4 hover:from-black'>
                        <p className="line-clamp-3 text-l text-white font-semibold">{track.name}</p>
                    </div>
                </a>
            </Link>
    )
}
