import { NavLink, Link, useHistory } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
    history.replace('/')
  }

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>NETFLIX</div>
      </Link>
      <nav>
        <ul>
		  	<li>
            <NavLink activeClassName={classes.active} to='/'>Home</NavLink>
          </li>
          {!isLoggedIn &&
          <li>
            <Link to='/auth'>Login</Link>
          </li>}
          {isLoggedIn && 
          <li>
            <NavLink activeClassName={classes.active} to='/profile'>Profile</NavLink>
          </li>}
          {isLoggedIn &&
          <li>
            <button onClick={logoutHandler}>Logout</button>
          </li>
          }
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
