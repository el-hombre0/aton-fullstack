import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectIsAuth } from "../../redux/slices/auth";
import React from "react";

export const Header = () => {
  const isAuth = useSelector(selectIsAuth);
  return (
    <div className="container">
      <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
        <div className="col-md-3 text-end">
          {!isAuth ? (
            <>
              <button type="button" className="btn btn-outline-primary m-2">
                <NavLink to="/login" className="nav-link">
                  Войти
                </NavLink>
              </button>
              <button type="button" className="btn btn-primary">
                <NavLink to="/register" className="nav-link">
                  Зарегистрироваться
                </NavLink>
              </button>
            </>
          ) : (
            <>
              <div>Здравствуйте!</div>
            </>
          )}
        </div>
      </header>
    </div>
  );
};
