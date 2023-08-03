import React, { useContext, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import AuthService from "../../api/authService";
import { AuthStatus } from "../../context/context";
import popcorn from "../../assets/popcorn.png";
import './nav.css';

const Navbar = () => {
  const { authStatus } = useContext(AuthStatus);
  const { userName } = useContext(AuthStatus);

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const authService = new AuthService();
    const loggedIn = localStorage.getItem("accessToken") !== null;

    authService.loggedIn = loggedIn;
  }, []);

  const logout = () => {
    const authService = new AuthService();
    authService.logout();
    history.push("/");
  };

  return (
    <header className="navbar navbar-expand-lg navbar-sm fixed-top bg-light">
      <div className="container">
        <img src={popcorn} alt='pop' width="250" height="50" name="iframe"/>
        <button
          type="button"
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse2"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <nav className="collapse navbar-collapse" id="navbarCollapse2">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link
                to="/"
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
              >
                Streaming now
              </Link>
            </li>
          </ul>
          {!authStatus && (
            <>
              <Link
                to="/login"
                className="btn btn-outline-primary btn-sm fs-sm d-lg-none ms-2"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-primary btn-sm fs-sm d-lg-none ms-2"
              >
                Register
              </Link>
            </>
          )}
          {authStatus && (
            <>
              <p className="navbar-brand m-2 p-2 me-3 text-info">
                {userName}
              </p>
              <button
                onClick={logout}
                className="btn btn-outline-primary btn-sm d-lg-none"
              >
                Logout
              </button>
            </>
          )}
          {!authStatus && (
            <>
              <Link
                to="/login"
                className="btn btn-outline-primary btn-sm me-2 d-none d-lg-inline-flex"
              >
                Login
              </Link>
              <button
                to="/register"
                className="btn btn-primary btn-sm d-none d-lg-inline-flex"
              >
                Register
              </button>
            </>
          )}
          {authStatus && (
            <button
              onClick={logout}
              className="btn btn-outline-primary btn-sm d-none d-lg-inline-flex"
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;