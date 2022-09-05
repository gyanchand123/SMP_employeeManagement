import React, { useContext } from "react";
import classes from "./Header.module.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Services/Authentication/AuthContext";
import { useNavigate } from "react-router-dom";
import CommonButton from "../../utilities/button/CommonButton";

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
              <CommonButton btnTitle='Logout' onClick={logoutHandler}/>  
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
