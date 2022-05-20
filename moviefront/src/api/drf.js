const HOST = 'http://127.0.0.1:8000/api/'

const ACCOUNTS = 'accounts/'
const MOVIES = 'movies/'
const REVIEWS = 'reviews/'
const ARTICLES = 'community/'
const COMMENTS = 'comments/'

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
		nyearMovies: year => HOST + MOVIES + 'nyear/' + `${year}/`,

		likeMovie: moviePk => HOST + MOVIES + `${moviePk}/` + 'like/',
		dislikeMovie: moviePk => HOST + MOVIES + `${moviePk}/` + 'dislike/',
		watchedMovie: moviePk => HOST + MOVIES + `${moviePk}/` + 'watched/',

		searchMovie: query => HOST + MOVIES + 'search/' + `${query}/`,
	
	
		reviews: moviePk => HOST + MOVIES + `${moviePk}/` + REVIEWS,
		comment: (moviePk, reviewPk) =>
			HOST + MOVIES + `${moviePk}/` + REVIEWS + `${reviewPk}/`,
	},
	articles: {
    articles: () => HOST + ARTICLES,
    article: articlePk => HOST + ARTICLES + `${articlePk}/`,
    likeArticle: articlePk => HOST + ARTICLES + `${articlePk}/` + 'like/',
    comments: articlePk => HOST + ARTICLES + `${articlePk}/` + COMMENTS,
    comment: (articlePk, commentPk) =>
      HOST + ARTICLES + `${articlePk}/` + COMMENTS + `${commentPk}/`,		
	}
}
