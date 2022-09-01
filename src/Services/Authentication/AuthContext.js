import React, { useState } from "react";

export const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  loggedInEmail:'',
  login: (token) => {},
  logout: () => {},
});

const AuthContextProvider = (props) => {

  const intialToken = localStorage.getItem('token')  ;
  const initialEmail = localStorage.getItem('logInEmail');

  const [token, setToken] = useState(intialToken);
  const [loggedEmail,setLoggedEmail] = useState(initialEmail);
  const userIsLoggedIn = !!token;

  //  for storing timer value after login to check/apply the total time the user can remain login.
  const calculateRemainingTime = (expirationTime) => {

    const currentTime = new Date().getTime(); // it gives times in milli-second for the current time
    const futurexpirationTime = new Date(expirationTime).getTime(); // its expecting the 'expirationTime in string' + time when the auth will expires
    const remainingTime = futurexpirationTime - currentTime;
    return remainingTime;
  }

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('logInEmail');
  };

  const loginHandler = (token,expirationTime,_email) => {
    setToken(token);
    setLoggedEmail(_email);
    localStorage.setItem('token',token);
    localStorage.setItem('logInEmail',_email);
    const remainingDuration = calculateRemainingTime(expirationTime);
    setTimeout(logoutHandler,remainingDuration);

  };

  

  const initialValues = {
    token,
    isLoggedIn: userIsLoggedIn,
    loggedInEmail:loggedEmail,
    login:loginHandler,
    logout:logoutHandler,
  };

  return (
    <AuthContext.Provider value={initialValues}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
