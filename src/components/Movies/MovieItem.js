import { Link } from 'react-router-dom';
import Article from '../UI/Article';
import classes from './MovieItem.module.css'

const MovieItem = (props) => {
	const {id, picture, title} = props;

	// onFocus should be done
	return(
		<li className={classes.item}>
			<Article>
				<header>
					<h2 className={classes.header}>{title}</h2>
				</header>
				<div className={classes.image}>
					<img src={picture} alt={`${title} poster`}/>
				</div>
				<footer className={classes.footer}>
					<Link to={`/movie/${id}`}>
						<button className={classes.btn}>Watch</button>
					</Link>
				</footer>
			</Article>
		</li>
	)
};

export default MovieItem;