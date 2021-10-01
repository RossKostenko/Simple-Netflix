import { Fragment, useCallback, useEffect, useState } from "react";
import MoviesList from './MoviesList'
import { getMoviesArr, fetchMoviesObj } from "../../lib/api";


const Movies = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [moveisArr, setMoviesArr] = useState([]);

	const fetchMoviesHandler = useCallback(async () => {
		setError(null);
		try {
			const moviesObj = await fetchMoviesObj()
			const moviesArr = await getMoviesArr(moviesObj)
			setMoviesArr(moviesArr);
		} catch (error) {
			setError(error.message)
		}
	}, [])

	useEffect(()=>{
		setIsLoading(true);
		fetchMoviesHandler();
		setIsLoading(false);
	}, [fetchMoviesHandler])

	console.log(moveisArr)

	let content;
	if (error) {
		content = <p className='error'>{error}</p>
	} 
	
	if (isLoading) {
		content = <p className='loading'>Loading...</p>
	} 
	
	if (!error && !isLoading){
		content = <MoviesList movies={moveisArr}/>
	}

	return(
		<Fragment>
			{content}
		</Fragment>
	)
}

export default Movies;