import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Repository from '../../core/repository'
import Link from 'next/link'
import *  as CONSTANTS from '../../utils/constants'
import TrackCard from '../../components/track_card'
import LoadingSpinner from '../../components/loading_spinner'
import getErrorMessage from '../../utils/helper'

export default function AlbumPage({ data }) {
    const router = useRouter()
    const { id } = router.query

    const [response, setResponse] = useState(
        {
            data: {
                tracks: [],
            },
            error: '',
            loading: true,
        })

    useEffect(() => {
        if (router.isReady) {
            const fetchData = async () => {
                const { data, error } = await Repository.getAlbumData(id)
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
            {
                response.loading
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
                                <p className='text-6xl font-bold text-blue-600'> ALBUM </p>
                            </div>
                            {
                                response.data.artist_name != null && response.data.artist_name != '' && response.data.artist_name != undefined
                                    ?
                                    <div className='flex flex-row items-end gap-2'>
                                        <p className='text-lg font-semibold text-white'> by </p>
                                        <Link href={`${CONSTANTS.artistPage}/${response.data.artist_id}`}>
                                            <a href={`${CONSTANTS.artistPage}/${response.data.artist_id}`}>
                                                <p className='text-3xl font-semibold text-white hover:text-red-300'> {response.data.artist_name} </p>
                                            </a>
                                        </Link >
                                    </div>
                                    :
                                    <></>
                            }
                            {
                                response.data.tracks.length != 0
                                    ? <div className="mt-4">
                                        <p className='text-xl text-white font-bold mb-4'>Tracks</p>
                                        <div className='flex flex-row overflow-x-auto gap-4 pb-5 scrollbar scrollbar-thumb-blue-700 scrollbar-track-gray-200'>
                                            {response.data.tracks.map((track) => {
                                                // eslint-disable-next-line react/jsx-key
                                                return <TrackCard track={track} disabled={true} />
                                            }
                                            )}
                                        </div>
                                    </div>
                                    :
                                    <></>
                            }
                            <img src={response.data.image} className='object-contain rounded-xl'></img>
                        </div>
            }
        </div>
    )
}
