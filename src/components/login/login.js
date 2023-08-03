import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthService from "../../api/authService";
import { AuthStatus } from "../../context/context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import './login.css';

const Login = () => {
  const [username, setUsername] = useState("");
  const { setUserName } = useContext(AuthStatus);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const authService = new AuthService();
  const history = useHistory();
  const { setAuthStatus } = useContext(AuthStatus);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSubmitted(true);

    if (!username || !password) {
      setError("Please enter both username and password.");
      setLoading(false);
      return;
    }

    authService
      .login({ username, password })
      .then((response) => {
        if (response.accessToken) {
          localStorage.setItem("accessToken", response.accessToken);
          localStorage.setItem("username", response.username);
          setUsername("");
          setPassword("");
          setUserName(response.username);
          setLoading(false);
          authService.loggedIn = true;
          setAuthStatus(true);
          authService.token = response.access;
          history.push("/");
        } else {
          setError(response.message);
          setLoading(false);
        }
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  return (
    <section id="login">
      <div className="container bg-login">
        <div className="row min-vh-100 d-flex justify-content-center align-items-center">
          <div className="col-lg-5">
            <div className="card bg-transparent border-0">
              <div className="card-body">
                <div className="text-center mb-4">
                  <img
                    src="https://img.freepik.com/free-vector/privacy-policy-concept-illustration_114360-7853.jpg?w=740&t=st=1689344036~exp=1689344636~hmac=514b0044996649df10fd116247cbcaf546e6edde489f33c8fa8787b32fe75f47"
                    width="200"
                    height="200"
                    alt="Login page illustration"
                  />
                  {/* <h3 className="text-black">Login to your account</h3> */}
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label text-white">
                      <FontAwesomeIcon icon={faUser} className="me-2" />
                      Username
                    </label>
                    <input
                      className={`form-control form-control-sm ${
                        (error || (submitted && !username)) && "is-invalid"
                      }`}
                      type="text"
                      name="username"
                      id="username"
                      value={username}
                      onChange={handleInputChange}
                      placeholder="Enter your Username"
                    />
                    {(submitted && !username) || error ? (
                      <div className="invalid-feedback text-white">
                        {submitted && !username
                          ? "This field is required"
                          : error}
                      </div>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label text-white">
                      <FontAwesomeIcon icon={faLock} className="me-2"/>
                      Password
                    </label>
                    <input
                      className={`form-control form-control-sm ${
                        (error || (submitted && !password)) && "is-invalid"
                      }`}
                      type="password"
                      name="password"
                      id="password"
                      value={password}
                      onChange={handleInputChange}
                      placeholder="Enter your Password"
                    />
                    {(submitted && !password) || error ? (
                      <div className="invalid-feedback text-white">
                        {submitted && !password
                          ? "This field is required"
                          : error}
                      </div>
                    ) : null}
                  </div>
                  <div className="text-center mb-3">
                    {!loading ? (
                      <button type="submit" className="btn btn-sm btn-success">
                        Login
                      </button>
                    ) : (
                      <button
                        className="btn btn-sm btn-success"
                        type="button"
                        disabled
                      >
                        <span
                          className="spinner-border spinner-border-sm me-1"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Checking..
                      </button>
                    )}
                  </div>
                </form>
                <div className="text-center mt-4">
                  <p className="text-white">
                    <a href="/register" className="text-white">Create Account</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
