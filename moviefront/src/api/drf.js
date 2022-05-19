const HOST = 'http://127.0.0.1:8000/api/'

const ACCOUNTS = 'accounts/'
const MOVIES = 'movies/'
const REVIEWS = 'reviews/'

export default {
	accounts: {
		login: () => HOST + ACCOUNTS + 'login/',
		logout: () => HOST + ACCOUNTS + 'logout/',
		signup: () => HOST + ACCOUNTS + 'signup/',
		currentUserInfo: () => HOST + ACCOUNTS + 'user/',
		profile: () => HOST + ACCOUNTS + 'profile/',
	},
	movies: {
		movies: () => HOST + MOVIES,
		movie: moviePk => HOST + MOVIES + `${moviePk}/`,
		nowMovies: () => HOST + MOVIES + 'now_playing/',
		lastMovies: () => HOST + MOVIES + 'last_year/',
		winMovies: () => HOST + MOVIES + 'winner/',
		recommendMovies: () => HOST + MOVIES + 'recommend/',

		likeMovie: moviePk => HOST + MOVIES + `${moviePk}/` + 'like/',
		dislikeMovie: moviePk => HOST + MOVIES + `${moviePk}/` + 'dislike/',
		watchedMovie: moviePk => HOST + MOVIES + `${moviePk}/` + 'watched/',
	
		reviews: moviePk => HOST + MOVIES + `${moviePk}/` + REVIEWS,
		comment: (moviePk, reviewPk) =>
			HOST + MOVIES + `${moviePk}/` + REVIEWS + `${reviewPk}/`,
	},
}
