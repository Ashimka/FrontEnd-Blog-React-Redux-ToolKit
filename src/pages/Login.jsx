import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setCredentials } from "../features/auth/authSlice";
import { useLoginMutation } from "../features/auth/authApiSlice";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState("ashimka");
  const [password, setPassword] = useState("460050");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await login({ email, password }).unwrap();

      dispatch(setCredentials({ ...userData, email }));

      setEmail("");
      setPassword("");
      navigate("/welcome");
    } catch (error) {
      if (!error?.originalStatus) {
        // isLoading: true until timeout occurs
        setErrMsg("No Server Response");
      } else if (error.originalStatus === 400) {
        setErrMsg("Missing Username or Password");
      } else if (error.originalStatus === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  const handleUserInput = (e) => setEmail(e.target.value);
  const handlePassInput = (e) => setPassword(e.target.value);

  const content = isLoading ? (
    <h1>Загрузка...</h1>
  ) : (
    <>
      <div className="container">
        <div className="login-page">
          <div className="header">
            <Link className="btn-logo" to="/">
              Ashimka-blog
            </Link>
          </div>
          <section className="login">
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>

            <h1>Вход</h1>

            <form onSubmit={handleSubmit}>
              <label htmlFor="username">Логин:</label>
              <input
                type="text"
                id="username"
                ref={userRef}
                value={email}
                onChange={handleUserInput}
                autoComplete="off"
                required
              />

              <label htmlFor="password">Пароль:</label>
              <input
                type="password"
                id="password"
                onChange={handlePassInput}
                value={password}
                required
              />
              <button>Вход</button>
            </form>
          </section>
        </div>
      </div>
    </>
  );

  return content;
};

export default Login;
