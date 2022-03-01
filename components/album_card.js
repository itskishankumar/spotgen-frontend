import Link from 'next/link'
import *  as CONSTANTS from '../utils/constants'

export default function AlbumCard({ album }) {
    return (
        <Link href={`${CONSTANTS.albumPage}/${album.id}`}>
            <a href={`${CONSTANTS.albumPage}/${album.id}`}>
                <div className='flex-none flex flex-col justify-center justify-items-center bg-gradient-to-b from-blue-900 to-blue-600 h-60 w-48 bg-white rounded-xl p-4 gap-4 hover:from-black'>
                    <img src={album.image} className='object-contain rounded-xl'></img>
                    <p className="line-clamp-1 text-l text-white font-semibold ">{album.name}</p>
                </div>
            </a>
        </Link >
    )
}
