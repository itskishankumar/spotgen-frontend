import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { getArtistData } from '../../core/repository'
import AlbumCard from '../../components/album_card'
import LoadingSpinner from '../../components/loading_spinner'
import *  as CONSTANTS from '../../utils/constants'
import getErrorMessage from '../../utils/helper'

export default function ArtistPage() {
    const router = useRouter()
    const { id } = router.query

    const {
        data: artistData,
        error,
        isLoading,
    } = useQuery({
        queryKey: ['artist', id],
        queryFn: () => getArtistData(id),
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

    if (!artistData) {
        return null
    }

    return (
        <div className=' grid grid-cols-1 gap-5'>
            <div className='flex flex-row justify-between'>
                <p className='text-6xl font-bold text-white'> {artistData.name} </p>
                <p className='text-6xl font-bold text-blue-600'> ARTIST </p>
            </div>
            {
                artistData.followers != null && artistData.followers !== '' && artistData.followers !== undefined
                    ?
                    <div className='flex flex-row items-end gap-2'>
                        <p className='text-2xl font-semibold text-white'> {artistData.followers} </p>
                        <p className='text-lg font-semibold text-white'> followers</p>
                    </div>
                    :
                    <></>
            }
            {
                artistData.artist_popularity != null && artistData.artist_popularity !== '' && artistData.artist_popularity !== undefined
                    ?
                    <div className='flex flex-row items-end gap-2'>
                        <p className='text-2xl font-semibold text-white'> {artistData.artist_popularity} </p>
                        <p className='text-lg font-semibold text-white'> popularity </p>
                    </div>
                    :
                    <></>
            }

            {
                artistData.albums && artistData.albums.length !== 0
                    ?
                    <div className="mt-4">
                        <p className='text-xl text-white font-bold mb-4'>Albums</p>
                        <div className='flex flex-row overflow-x-auto gap-4 pb-10 scrollbar scrollbar-thumb-blue-700 scrollbar-track-gray-200'>
                            {artistData.albums.map((album) => {
                                // eslint-disable-next-line react/jsx-key
                                return <AlbumCard album={album} />
                            })}
                        </div>
                    </div>
                    :
                    <></>
            }
        </div>
    )
}