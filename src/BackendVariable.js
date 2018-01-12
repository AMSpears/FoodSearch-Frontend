let backend
if (document.location.hostname === 'localhost') {
	backend = 'http://localhost:4000/'
} else {
	backend = 'https://food-search-app.herokuapp.com/'
}

export default backend
