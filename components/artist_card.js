import Link from 'next/link'
import *  as CONSTANTS from '../utils/constants'

export default function ArtistCard({ artist }) {
  return (
    <Link href={`${CONSTANTS.artistPage}/${artist.artist_id}`} >
      <a href={`${CONSTANTS.artistPage}/${artist.artist_id}`}>
        <div className='flex-none flex justify-center items-center h-40 w-40 bg-gradient-to-b from-blue-900 to-blue-600 mr-5 rounded-xl p-4 hover:from-black'>
          <p className="line-clamp-3 text-l text-white font-semibold">{artist.name}</p>
        </div>
      </a>
    </Link>
  )
}