import { useState } from 'react'
import { searchInDb } from '../../core/repository'
import ArtistCard from '../../components/artist_card'
import TrackCard from '../../components/track_card'
import AlbumCard from '../../components/album_card'
import *  as CONSTANTS from '../../utils/constants'
import LoadingSpinner from '../../components/loading_spinner'
import getErrorMessage from '../../utils/helper'

export default function SearchPage() {

  const [response, setResponse] = useState(
    {
      artistsData: [],
      tracksData: [],
      albumData: [],
      error: null,
      loading: false,
    })

  let timer
  async function handleSearch(searchTerm) {
    // timer to ensure that the search happens only .5 second after last keystroke, and no search happens in between
    clearTimeout(timer)
    timer = setTimeout(async () => {
      setResponse(
        {
          artistsData: [],
          tracksData: [],
          albumData: [],
          error: null,
          loading: true,
        })
      let dataa = []
      let errorr = CONSTANTS.NO_ERROR
      if (searchTerm) {
        const { data, error } = await searchInDb(searchTerm)
        if (data != null) {
          dataa = data
        }
        errorr = error
      }
      setResponse({
        artistsData: dataa.artistsData,
        tracksData: dataa.tracksData,
        albumData: dataa.albumData,
        error: errorr,
        loading: false,
      })
    }, 500)
  }

  return (
    <div className='pb-10'>
      <input className="h-15 w-96 py-5 px-6 rounded-full text-xl font-bold" type="text" placeholder='Artists, Tracks or Albums' onChange={searchTerm => handleSearch(searchTerm.target.value)}></input>
      {
        response.loading
          ?
          <LoadingSpinner />
          :
          response.error != null
            ?
            <div className="mt-8">
              <p className='text-xl text-white font-bold mb-4'>{getErrorMessage(response.error)}</p>
            </div>
            :
            <div>
              <div className="mt-8">
                {response.artistsData.length != 0 ? <p className='text-xl text-white font-bold mb-4'>Artists</p> : <></>}
                <div className='flex flex-row overflow-x-auto pb-10 scrollbar scrollbar-thumb-blue-700 scrollbar-track-gray-200'>
                  {response.artistsData.map((data) => {
                    return <ArtistCard artist={data} key={data.id} />
                  }
                  )}
                </div>
              </div>
              <div className="mt-4">
                {response.tracksData.length != 0 ? <p className='text-xl text-white font-bold mb-4'>Tracks</p> : <></>}
                <div className='flex flex-row overflow-x-auto pb-10 scrollbar scrollbar-thumb-blue-700 scrollbar-track-gray-200'>
                  {response.tracksData.map((data) => {
                    return <TrackCard track={data} key={data.id} />
                  }
                  )}
                </div>
              </div>
              <div className="mt-4">
                {response.albumData.length != 0 ? <p className='text-xl text-white font-bold mb-4'>Albums</p> : <></>}
                <div className='flex flex-row overflow-x-auto gap-4 pb-10 scrollbar scrollbar-thumb-blue-700 scrollbar-track-gray-200'>
                  {response.albumData.map((data) => {
                    return <AlbumCard album={data} key={data.id} />
                  }
                  )}
                </div>
              </div>
            </div>
      }
    </div>
  )
}
