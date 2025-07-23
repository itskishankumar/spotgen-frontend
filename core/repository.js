import *  as CONSTANTS from '../utils/constants'
import * as NETWORK_HELPER from './network_helper'

class Repository {
  // only persisting these 2 data for now as the other responses are small
  constructor() {
    this.insight1Data = null
    this.insight5Data = null
  }

  async searchInDb(searchTerm) {
    // if search term contains only spaces
    if (!searchTerm.replace(/\s/g, '').length) {
      throw new Error(CONSTANTS.INVALID_SEARCH_INPUT_ERROR )
    }
    const data = await NETWORK_HELPER.GET(CONSTANTS.searchUrl + encodeURIComponent(searchTerm))
    if (!data || data.length === 0) {
      throw new Error(CONSTANTS.SEARCH_RETURNED_EMPTY_ERROR)
    }
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
      artistsData: artistsData,
      tracksData: tracksData,
      albumData: albumData,
    }
  }

  async getArtistData(id) {
    return await NETWORK_HELPER.GET(CONSTANTS.artistDataUrl + id)
  }

  async getAlbumData(id) {
    return await NETWORK_HELPER.GET(CONSTANTS.albumDataUrl + id)
  }

  async getAudioTrendsOverTimeUrl() {
    if (this.insight1Data == undefined || this.insight1Data == null || this.insight1Data.error != null) {
      this.insight1Data = await NETWORK_HELPER.GET(CONSTANTS.audioTrendsOverTimeUrl)
    }
    return this.insight1Data
  }

  async getArtistLongestReleaseSpans() {
    return await NETWORK_HELPER.GET(CONSTANTS.artistLongestReleaseSpansUrl)
  }

  async getGenresWithMostArtists() {
    return await NETWORK_HELPER.GET(CONSTANTS.genresWithMostArtistsUrl)
  }

  async getPopularArtistsOfGenre(genre) {
    return await NETWORK_HELPER.GET(CONSTANTS.popularArtistsOfGenreUrl + genre.toLowerCase())
  }

  async getTop10Genres() {
    return await NETWORK_HELPER.GET(CONSTANTS.top10GenresUrl)
  }

  async getTracksPopularityInsight() {
    if (this.insight5Data == undefined || this.insight5Data == null || this.insight5Data.error != null) {
      this.insight5Data = await NETWORK_HELPER.GET(CONSTANTS.tracksPopularityInsightUrl)
    }
    return this.insight5Data
  }
}

export default new Repository()

















