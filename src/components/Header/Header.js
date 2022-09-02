import React, { useContext } from "react";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Services/Authentication/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    logout();
    navigate("/login", { replace: true });
  };

 

  return (
    <header className={classes.parentAlign}>
      <ul className="list">
        <li>
          <Link to="/welcome">welcome | </Link>
        </li>
        {!isLoggedIn && (
          <li>
            <Link to="/login">login |</Link>
          </li>
        )}
        {isLoggedIn && (
          <>
            <li>
              <Link to="/profile" >Profile |</Link>
            </li>
            <li>
              <button onClick={logoutHandler}>logout</button>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
