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
		signupPlus: (username, nickname) => HOST + ACCOUNTS + 'signup_plus/' + `${username}/` + `${nickname}/`,

		currentUserInfo: () => HOST + ACCOUNTS + 'user/',
		profile: () => HOST + ACCOUNTS + 'profile/',
		nickname: nickname => HOST + ACCOUNTS + 'nickname/' + `${nickname}/`,
		follow: (myname, yourname) => HOST + ACCOUNTS + 'follow/' + `${myname}/` + `${yourname}/`
	},
	movies: {
		movies: () => HOST + MOVIES,
		movie: moviePk => HOST + MOVIES + `${moviePk}/`,

		nowMovies: () => HOST + MOVIES + 'now_playing/',
		lastMovies: () => HOST + MOVIES + 'last_year/',
		winMovies: () => HOST + MOVIES + 'winner/',

		recommendMovies: username => HOST + MOVIES + 'recommend/' + `${username}/`,

		selectMovie: moviePk => HOST + MOVIES + 'select/' + `${moviePk}/`,

		searchMovie: query => HOST + MOVIES + 'search/' + `${query}/`,
		
		roundSelect: exponent => HOST + MOVIES + 'matchup/' + `${exponent}/`,
		worldCup: exponent => HOST + MOVIES + 'worldcup/' + `${exponent}/`,
	
		reviews: moviePk => HOST + MOVIES + `${moviePk}/` + REVIEWS,
		comment: (moviePk, reviewPk) =>
			HOST + MOVIES + `${moviePk}/` + REVIEWS + `${reviewPk}/`,

		genres: () => HOST + MOVIES + 'genres/',
		like_genre: () => HOST + MOVIES + 'like_genre/'
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
