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
		profile: username => HOST + ACCOUNTS + 'profile/' + username,
	},
	movies: {
		movies: () => HOST + MOVIES,
		movie: moviePk => HOST + MOVIES + `${moviePk}/`,

		likeMovie: moviePk => HOST + MOVIES + `${moviePk}/` + 'like/',
		dislikeMovie: moviePk => HOST + MOVIES + `${moviePk}/` + 'dislike/',
		watchedMovie: moviePk => HOST + MOVIES + `${moviePk}/` + 'watched/',
	
		reviews: moviePk => HOST + MOVIES + `${moviePk}/` + REVIEWS,
		comment: (moviePk, reviewPk) =>
			HOST + MOVIES + `${moviePk}/` + REVIEWS + `${reviewPk}/`,
	},
}
