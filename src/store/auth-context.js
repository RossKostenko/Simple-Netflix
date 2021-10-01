import React, { useState, useEffect, useCallback }from "react";
let logoutTimer;

const AuthContext = React.createContext({
   token: '',
   isLoggedIn: false,
   login: (token) => {},
   logout: () => {}
});

const calcuteRemainingTime = expirationTime => {
   const currentTime = new Date().getTime();
   const adjustedExpirationTime = new Date(expirationTime).getTime()

   const remainingTime = adjustedExpirationTime - currentTime;

   return remainingTime;
}

const retrievedStoredToken = () => {
   const storedToken = localStorage.getItem('token');
   const storedExpiretionDate = localStorage.getItem('expirationTime');

   const remainingTime = calcuteRemainingTime(storedExpiretionDate);

   if (remainingTime < 60000) {
      localStorage.removeItem('token');
      localStorage.removeItem('expirationTime');
      return null
   }

   return {
      token: storedToken,
      duration: remainingTime
   };
}



export const AuthContextProvider = (props) => {
   const tokenData = retrievedStoredToken()
   let initialToken;

   if (tokenData) {
      initialToken = tokenData.token
   } else {
      initialToken = null
   }

   const [token, setToken] = useState(initialToken);
   const userIsLoggedIn = !!token;

   const logoutHandler = useCallback(() => {
      setToken(null);
      localStorage.removeItem('token');
      localStorage.removeItem('expirationTime');

      if (logoutTimer) {
         clearTimeout(logoutTimer);
      }
   },[]);

   const loginHandler = (token, expirationTime) => {
      setToken(token)
      localStorage.setItem('token', token);
      localStorage.setItem('expirationTime', expirationTime);
      
      const remainingTime = calcuteRemainingTime(expirationTime)

      logoutTimer = setTimeout(logoutHandler, remainingTime)
   };

   useEffect(() => {
      if (tokenData) {
         
         logoutTimer = setTimeout(logoutHandler, tokenData.duration)
      }
   },[tokenData, logoutHandler])

   const contextValue = {
      token: token,
      isLoggedIn: userIsLoggedIn,
      login: loginHandler,
      logout: logoutHandler
   }

   return (
      <AuthContext.Provider value={contextValue}>
         {props.children}
      </AuthContext.Provider>)
}

export default AuthContext;

