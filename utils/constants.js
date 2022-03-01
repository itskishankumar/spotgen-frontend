// chart types
export const BAR_CHART = 'BAR'
export const LINE_CHART = 'LINE'
export const PIE_CHART = 'PIE'

// internal routes
export const searchPage = '/search'
export const insightsPage = '/insights'
export const artistPage = '/artist'
export const albumPage = '/album'

// external apis (to be changed if hosting backend)
export const searchUrl = 'http://localhost:5000/search/'
export const artistDataUrl = 'http://localhost:5000/artists/findById/'
export const albumDataUrl = 'http://localhost:5000/albums/findById/'
export const audioTrendsOverTimeUrl = 'http://localhost:5000/insights/getAudioTrendsOverTime'
export const artistLongestReleaseSpansUrl = 'http://localhost:5000/insights/getArtistLongestReleaseSpans'
export const genresWithMostArtistsUrl = 'http://localhost:5000/insights/getGenresWithMostArtists'
export const popularArtistsOfGenreUrl = 'http://localhost:5000/insights/getPopularArtistsOfGenre/'
export const top10GenresUrl = 'http://localhost:5000/insights/getTop10Genres/'
export const tracksPopularityInsightUrl = 'http://localhost:5000/insights/getTracksPopularityInsight/'


// errors and messages
export const NETWORK_ERROR = 'NETWORK_ERROR'
export const NETWORK_FAILURE = 'NETWORK_FAILURE'
export const SEARCH_RETURNED_EMPTY_ERROR = 'SEARCH_RETURNED_EMPTY'
export const NO_ERROR = 'NO_ERROR'
export const INVALID_SEARCH_INPUT_ERROR = 'INVALID_SEARCH_INPUT_ERROR'

export const OFFLINE_MESSAGE = 'You are currently offline. Please go online and try again.'
export const NETWORK_ERROR_MESSAGE = 'ERROR 404. Did not find the resource you\'re looking for.'
export const NETWORK_FAILURE_MESSAGE = 'Something went wrong on our end. Please try again later.'

export const INVALID_SEARCH_INPUT_MESSAGE = 'Invalid term entered. Please try another term.'
export const SEARCH_EMPTY_MESSAGE = 'Could not find any results. Try changing the search term.'


