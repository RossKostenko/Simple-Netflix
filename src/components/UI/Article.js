import classes from './Article.module.css'

const Article = (props) => {
	return (
		<article className={classes.card}>{props.children}</article>
	)
}

export default Article;