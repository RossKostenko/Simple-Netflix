import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback, useContext } from "react";

import { fetchMoviesObj, getSingleMovieData } from "../../lib/api";
import Article from '../UI/Article'
import { Fragment } from "react";
import classes from './MovieArticle.module.css'
import AuthContext from '../../store/auth-context';

const MovieArticle = () => {
	const authCtx = useContext(AuthContext);
	const { isLoggedIn: isAuth } = authCtx;
	const params = useParams();
	const { movieId } = params;

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [movieData, setMovieData] = useState(null);

	const fetchMoviesHandler = useCallback(async () => {
		setError(null);
		try {
			const moviesObj = await fetchMoviesObj()
			const singleMovieData = await getSingleMovieData(moviesObj, movieId)
			setMovieData(singleMovieData);
		} catch (error) {
			setError(error.message)
		}
	}, [movieId])

	useEffect(()=>{
		setIsLoading(true);
		fetchMoviesHandler()
		setIsLoading(false);
	}, [fetchMoviesHandler]);

	console.log('IsLoggedIn: ' + isAuth)
	let content;
	if (error) {
		content = <p className='error'>{error}</p>
	} 
	
	if (isLoading) {
		content = <p className='loading'>Loading...</p>
	} 
	
	if (!error && !isLoading && movieData){
		content = (
			<div className={classes['article-container']}>
				<Article>
					<div className={classes['article']}>
						<div className={classes['article__image__container']}>
							<img src={movieData.picture} alt={`${movieData.title} poster`}/>
						</div>
						<div className={classes['article__data']}>
							{isAuth && <button className={classes.favourite}>Add to favourites</button>}
							<div className={classes['article__data__title']}>
								<div>
									<h2>{movieData.title}</h2>
								</div>
								<div className={classes['article__main__info']}>
										<h3>{`Producer: ${movieData.producer}`}</h3>
										<h4>{`Release Date: ${movieData.releaseDate}`}</h4>
								</div>
								<div className={classes['article__details']}>
									<p>Description:</p>
									<p>{movieData.details}</p>
								</div>
							</div>
						</div>
					</div>
				</Article>
			</div>
		)
	}

	return (
		<Fragment>{content}</Fragment>
	)
}

export default MovieArticle;