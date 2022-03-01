import *  as CONSTANTS from '../utils/constants'
import * as NETWORK_HELPER from './network_helper'

export async function searchInDb(searchTerm) {
  // if search term contains only spaces
  if (!searchTerm.replace(/\s/g, '').length) {
    return { data: null, error: CONSTANTS.INVALID_SEARCH_INPUT_ERROR }
  }
  const { data, error } = await NETWORK_HELPER.GET(CONSTANTS.searchUrl + encodeURIComponent(searchTerm))
  if (error != null) {
    return { data: null, error: error }
  } else if (data == [] || data == null || data == undefined || data.length == 0) {
    return { data: null, error: CONSTANTS.SEARCH_RETURNED_EMPTY_ERROR }
  } else {
    const artistsData = []
    const tracksData = []
    const albumData = []
    data.forEach(dat => {
      if (dat.type == 'artist') {
        artistsData.push(dat)
      }
      if (dat.type == 'track') {
        tracksData.push(dat)
      }
      if (dat.type == 'album') {
        albumData.push(dat)
      }
    })
    return {
      data: {
        artistsData: artistsData,
        tracksData: tracksData,
        albumData: albumData,
      }, error: null,
    }
  }
}

export async function getArtistData(id) {
  return await NETWORK_HELPER.GET(CONSTANTS.artistDataUrl + id)
}

export async function getAlbumData(id) {
  return await NETWORK_HELPER.GET(CONSTANTS.albumDataUrl + id)
}

export async function getAudioTrendsOverTimeUrl() {
  return await NETWORK_HELPER.GET(CONSTANTS.audioTrendsOverTimeUrl)
}

export async function getArtistLongestReleaseSpans() {
  return await NETWORK_HELPER.GET(CONSTANTS.artistLongestReleaseSpansUrl)
}

export async function getGenresWithMostArtists() {
  return await NETWORK_HELPER.GET(CONSTANTS.genresWithMostArtistsUrl)
}

export async function getPopularArtistsOfGenre(genre) {
  return await NETWORK_HELPER.GET(CONSTANTS.popularArtistsOfGenreUrl + genre.toLowerCase())
}

export async function getTop10Genres() {
  return await NETWORK_HELPER.GET(CONSTANTS.top10GenresUrl)
}

export async function getTracksPopularityInsight() {
  return await NETWORK_HELPER.GET(CONSTANTS.tracksPopularityInsightUrl)
}














