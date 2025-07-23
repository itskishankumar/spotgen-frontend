import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import Repository from '../../core/repository'
import Link from 'next/link'
import *  as CONSTANTS from '../../utils/constants'
import TrackCard from '../../components/track_card'
import LoadingSpinner from '../../components/loading_spinner'
import getErrorMessage from '../../utils/helper'

export default function AlbumPage() {
    const router = useRouter()
    const { id } = router.query

    const {
        data: albumData,
        error,
        isLoading,
    } = useQuery({
        queryKey: ['album', id],
        queryFn: () => Repository.getAlbumData(id),
        enabled: !!id,
        staleTime: Infinity
    })

    if (isLoading) {
        return <LoadingSpinner />
    }

    if (error) {
        return (
            <div>
                <p className='text-xl text-white font-bold mb-4'>{getErrorMessage(error.message)}</p>
            </div>
        )
    }

    if (!albumData) {
        return null
    }

    return (
        <div className=' grid grid-cols-1 gap-5'>
            <div className='flex flex-row justify-between'>
                <p className='text-6xl font-bold text-white'> {albumData.name} </p>
                <p className='text-6xl font-bold text-blue-600'> ALBUM </p>
            </div>
            {
                albumData.artist_name != null && albumData.artist_name != '' && albumData.artist_name != undefined
                    ?
                    <div className='flex flex-row items-end gap-2'>
                        <p className='text-lg font-semibold text-white'> by </p>
                        <Link href={`${CONSTANTS.artistPage}/${albumData.artist_id}`}>
                            <a href={`${CONSTANTS.artistPage}/${albumData.artist_id}`}>
                                <p className='text-3xl font-semibold text-white hover:text-red-300'> {albumData.artist_name} </p>
                            </a>
                        </Link >
                    </div>
                    :
                    <></>
            }
            {
                albumData.tracks.length != 0
                    ? <div className="mt-4">
                        <p className='text-xl text-white font-bold mb-4'>Tracks</p>
                        <div className='flex flex-row overflow-x-auto gap-4 pb-5 scrollbar scrollbar-thumb-blue-700 scrollbar-track-gray-200'>
                            {albumData.tracks.map((track) => {
                                // eslint-disable-next-line react/jsx-key
                                return <TrackCard track={track} disabled={true} />
                            }
                            )}
                        </div>
                    </div>
                    :
                    <></>
            }
            <img src={albumData.image} className='object-contain rounded-xl'></img>
        </div>
    )
}
