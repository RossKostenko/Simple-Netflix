import MovieItem from './MovieItem';
import classes from './MoviesList.module.css'

const renderSingleMovie = (movie) => {
	return (
	<MovieItem 
		key={movie.id}
		id={movie.id}
		details={movie.details}
		director={movie.director}
		likes={movie.likes}
		picture={movie.picture}
		producer={movie.producer}
		releaseDate={movie.releaseDate}
		title={movie.title}
	/>
	)
}

const MoviesList = (props) => {

	return (
		<ul className={classes['movies-list']}>
			{props.movies.map(renderSingleMovie)}
		</ul>
	)
} 

export default MoviesList;