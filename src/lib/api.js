const FIREBASE_DOMAIN = 'https://react-post-try-default-rtdb.firebaseio.com';

export const fetchMoviesObj = async () => {
	const response = await fetch(`${FIREBASE_DOMAIN}/movies.json`);
	if (!response.ok) {
		throw new Error('Something went wrong')
	}
	const data = await response.json();
	return data
}

// it uses Firebase as database, so if
	// you change this change array logic 
	// as well

export const getMoviesArr = (obj) => {
	for (const key in obj) {
		const propperMoviesArr = obj[key];
		return propperMoviesArr;
	}
	
}

export const getSingleMovieData = (obj, id) => {
	for (const key in obj) {
		const propperMoviesArr = obj[key].find(el => el.id === Number(id))
		return propperMoviesArr;
	}
}

	