import { Switch, Route, Redirect} from 'react-router-dom';
import { useContext } from 'react';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import AuthContext from './store/auth-context';
import MoviePage from './pages/MoviePage';

function App() {
  const authCtx = useContext(AuthContext);
  const { isLoggedIn } = authCtx;
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        {!isLoggedIn && (
        <Route path='/auth'>
          <AuthPage />
        </Route>
        )}
        <Route path='/profile'>
        {isLoggedIn && <UserProfile />}
        {!isLoggedIn && <Redirect to="/auth"/>}
        </Route>
        <Route path="/movie/:movieId">
				<MoviePage />
		  </Route>
      </Switch>
    </Layout>
  );
}

export default App;

// <Route path='*'>
// <Redirect to="/"/>
// </Route>
