import { useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import classes from './ProfileForm.module.css';
import AuthContext from '../../store/auth-context';

const ProfileForm = () => {
  const history = useHistory();
  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const idToken = authCtx.token

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;
    // addValidation

    fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCEXg2ucac63NgBBHPLuLfr73HaQHhaLqE', 
    {
      method: 'POST',
      body: JSON.stringify({
        idToken,
        password: enteredNewPassword,
        returnSecureToken: false
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      // assumption that it always succeeds! 
      // !!!! YOU HAVE TO ADD THIS
      // U can make some page about success
      history.replace('/')
    })
    .catch()


  } 
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength="7" ref={newPasswordInputRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
