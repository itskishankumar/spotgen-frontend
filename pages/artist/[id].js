import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Repository from '../../core/repository'
import AlbumCard from '../../components/album_card'
import LoadingSpinner from '../../components/loading_spinner'
import *  as CONSTANTS from '../../utils/constants'
import getErrorMessage from '../../utils/helper'

export default function ArtistPage() {
    const router = useRouter()
    const { id } = router.query

    const [response, setResponse] = useState(
        {
            data: [],
            error: null,
            loading: true,
        })

    useEffect(() => {
        if (router.isReady) {
            const fetchData = async () => {
                const { data, error } = await Repository.getArtistData(id)
                setResponse({
                    data: data,
                    error: error,
                    loading: false,
                })
            }
            fetchData()
        }
    }, [router.isReady])

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
                    :
                    <div className=' grid grid-cols-1 gap-5'>
                        <div className='flex flex-row justify-between'>
                            <p className='text-6xl font-bold text-white'> {response.data.name} </p>
                            <p className='text-6xl font-bold text-blue-600'> ARTIST </p>
                        </div>
                        {
                            response.data.followers != null && response.data.followers != '' && response.data.followers != undefined
                                ?
                                <div className='flex flex-row items-end gap-2'>
                                    <p className='text-2xl font-semibold text-white'> {response.data.followers} </p>
                                    <p className='text-lg font-semibold text-white'> followers</p>
                                </div>
                                :
                                <></>
                        }
                        {
                            response.data.artist_popularity != null && response.data.artist_popularity != '' && response.data.artist_popularity != undefined
                                ?
                                <div className='flex flex-row items-end gap-2'>
                                    <p className='text-2xl font-semibold text-white'> {response.data.artist_popularity} </p>
                                    <p className='text-lg font-semibold text-white'> popularity </p>
                                </div>
                                :
                                <></>
                        }

                        {
                            response.data.albums.length != 0
                                ?
                                <div className="mt-4">
                                    <p className='text-xl text-white font-bold mb-4'>Albums</p>
                                    <div className='flex flex-row overflow-x-auto gap-4 pb-10 scrollbar scrollbar-thumb-blue-700 scrollbar-track-gray-200'>
                                        {response.data.albums.map((album) => {
                                            // eslint-disable-next-line react/jsx-key
                                            return <AlbumCard album={album} />
                                        }
                                        )
                                        }
                                    </div>
                                </div>
                                :
                                <></>
                        }
                    </div>
            }
        </div>
    )
}