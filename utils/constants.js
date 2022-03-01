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
export const searchUrl = `${process.env.NEXT_PUBLIC_SPOTGEN_BACKEND_DOMAIN}/search/`
export const artistDataUrl = `${process.env.NEXT_PUBLIC_SPOTGEN_BACKEND_DOMAIN}/artists/findById/`
export const albumDataUrl = `${process.env.NEXT_PUBLIC_SPOTGEN_BACKEND_DOMAIN}/albums/findById/`
export const audioTrendsOverTimeUrl = `${process.env.NEXT_PUBLIC_SPOTGEN_BACKEND_DOMAIN}/insights/getAudioTrendsOverTime`
export const artistLongestReleaseSpansUrl = `${process.env.NEXT_PUBLIC_SPOTGEN_BACKEND_DOMAIN}/insights/getArtistLongestReleaseSpans`
export const genresWithMostArtistsUrl = `${process.env.NEXT_PUBLIC_SPOTGEN_BACKEND_DOMAIN}/insights/getGenresWithMostArtists`
export const popularArtistsOfGenreUrl = `${process.env.NEXT_PUBLIC_SPOTGEN_BACKEND_DOMAIN}/insights/getPopularArtistsOfGenre/`
export const top10GenresUrl = `${process.env.NEXT_PUBLIC_SPOTGEN_BACKEND_DOMAIN}/insights/getTop10Genres/`
export const tracksPopularityInsightUrl = `${process.env.NEXT_PUBLIC_SPOTGEN_BACKEND_DOMAIN}/insights/getTracksPopularityInsight/`


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


