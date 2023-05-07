import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logOut } from "../features/auth/authSlice";
import { useLogoutMutation } from "../features/auth/authApiSlice";

const Header = () => {
  const isAuth = Boolean(
    useSelector((state) => state.persistedReducer.auth.token)
  );
  const avatarDefault = "profile.png";

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
      <div className="container">
        <div className="header-wrap">
          <Link to="/">Ashimka-blog</Link>
          <div className="header__right">
            {isAuth ? (
              <>
                <Link to={"/welcome"}>
                  <div className="header-avatar">
                    <img
                      className="avatar-image"
                      src={`http://localhost:5006/${avatarDefault}`}
                      alt={"avatar"}
                    />
                  </div>
                </Link>
                <button className="btn-out" onClick={handleLogout}>
                  Выход
                </button>
              </>
            ) : (
              <Link to={"/login"}>Войти</Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
