import classes from './StartingPageContent.module.css';

import Movies from '../Movies/Movies'

const StartingPageContent = () => {
  return (
    <section className={classes.starting}>
      <h1>Welcome To Simple Netflix</h1>
		<Movies />
    </section>
  );
};

export default StartingPageContent;
