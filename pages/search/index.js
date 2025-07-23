import { useState, useCallback, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import debounce from 'lodash/debounce'
import Repository from '../../core/repository'
import ArtistCard from '../../components/artist_card'
import TrackCard from '../../components/track_card'
import AlbumCard from '../../components/album_card'
import LoadingSpinner from '../../components/loading_spinner'
import getErrorMessage from '../../utils/helper'

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('')

  // Debounced input handler using useCallback + lodash.debounce
  const debouncedSetSearchTerm = useCallback(
    debounce((value) => setSearchTerm(value), 500),
    []
  )

  useEffect(() => {
    return () => {
      debouncedSetSearchTerm.cancel()
    }
  }, [debouncedSetSearchTerm])

  const {
    data,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['search', searchTerm],
    queryFn: () => Repository.searchInDb(searchTerm),
    enabled: !!searchTerm,
    staleTime: 0,
  })

  return (
    <div className='pb-10'>
      <input
        className="h-15 w-96 py-5 px-6 rounded-full text-xl font-bold"
        type="text"
        placeholder='Artists, Tracks or Albums'
        onChange={e => debouncedSetSearchTerm(e.target.value)}
      />
      {
        isLoading
          ?
          <LoadingSpinner />
          :
          error
            ?
            <div className="mt-8">
              <p className='text-xl text-white font-bold mb-4'>{getErrorMessage(error.message)}</p>
            </div>
            :
            data && (
              <div>
                <div className="mt-8">
                  {data.artistsData.length !== 0 ? <p className='text-xl text-white font-bold mb-4'>Artists</p> : <></>}
                  <div className='flex flex-row overflow-x-auto pb-10 scrollbar scrollbar-thumb-blue-700 scrollbar-track-gray-200'>
                    {data.artistsData.map((artist) => (
                      <ArtistCard artist={artist} key={artist.id} />
                    ))}
                  </div>
                </div>
                <div className="mt-4">
                  {data.tracksData.length !== 0 ? <p className='text-xl text-white font-bold mb-4'>Tracks</p> : <></>}
                  <div className='flex flex-row overflow-x-auto pb-10 scrollbar scrollbar-thumb-blue-700 scrollbar-track-gray-200'>
                    {data.tracksData.map((track) => (
                      <TrackCard track={track} key={track.id} />
                    ))}
                  </div>
                </div>
                <div className="mt-4">
                  {data.albumData.length !== 0 ? <p className='text-xl text-white font-bold mb-4'>Albums</p> : <></>}
                  <div className='flex flex-row overflow-x-auto gap-4 pb-10 scrollbar scrollbar-thumb-blue-700 scrollbar-track-gray-200'>
                    {data.albumData.map((album) => (
                      <AlbumCard album={album} key={album.id} />
                    ))}
                  </div>
                </div>
              </div>
            )
      }
    </div>
  )
}
