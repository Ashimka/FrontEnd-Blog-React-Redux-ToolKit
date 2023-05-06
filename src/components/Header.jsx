import React from "react";
import { Link, useNavigate } from "react-router-dom";
// import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";

import { logOut } from "../features/auth/authSlice";
import { useLogoutMutation } from "../features/auth/authApiSlice";

const Header = () => {
  // const isAuth = false;
  const isAuth = Boolean(
    useSelector((state) => state.persistedReducer.auth.token)
  );
  console.log(isAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logoutUser] = useLogoutMutation();

  const handleLogout = async () => {
    await logoutUser();
    dispatch(logOut());
    navigate("/");
  };

  return (
    <header className="header">
      <Link to="/">Ashimka-blog</Link>
      <div>
        {isAuth ? (
          <>
            <Link to={"/welcome"}>Профиль</Link>
            <button className="btn-out" onClick={handleLogout}>
              Выход
            </button>
          </>
        ) : (
          <Link to={"/login"}>Войти</Link>
        )}
      </div>
    </header>
  );
};

export default Header;
