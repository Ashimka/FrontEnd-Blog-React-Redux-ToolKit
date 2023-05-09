import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { registerUser } from "../features/auth/registerSlice";

const Register = () => {
  const dispatch = useDispatch();

  const userRef = useRef();
  const fullNameRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, fullName, password]);

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      dispatch(registerUser({ email, fullName, password }));

      setEmail("");
      setFullName("");
      setPassword("");
    } catch (error) {
      console.log(error);
      if (!error.response) {
        setErrMsg("Сервер не отвечает");
        if (error.status === 409)
          setErrMsg("Пользователь с таким email уже существует");
        if (error.status === 400)
          setErrMsg("Пользователь или пароль не найдены");
        if (error.response) setErrMsg("Ошибка регистрации");
      }
      errRef.current.focus();
    }
  };

  const handleEmailInput = (e) => setEmail(e.target.value);
  const handleFullNameInput = (e) => setFullName(e.target.value);
  const handlePassordInput = (e) => setPassword(e.target.value);

  const clickSignUp = () => {
    navigate("/login");
  };

  let content;

  // if (status === "loading") {
  //   content = <p>Загрузка...</p>;
  // }

  content = (
    <>
      <div className="container">
        <div className="login-page">
          <div className="login-header">
            <Link className="link-logo" to="/">
              Ashimka-blog
            </Link>
          </div>

          {/* <section className="login">
            <h2 className="login-title">Вы зарегистрировались!</h2>
            <p>
              <Link to={"/login"}>Вход</Link>
            </p>
          </section> */}

          <section className="login">
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>

            <h1 className="login-title">Регистация</h1>

            <form onSubmit={handleSubmit}>
              <label htmlFor="username">Email:</label>
              <input
                type="text"
                id="username"
                ref={userRef}
                value={email}
                onChange={handleEmailInput}
                autoComplete="off"
                required
              />
              <label htmlFor="fullname">Никнейм:</label>
              <input
                type="text"
                id="fullname"
                ref={fullNameRef}
                value={fullName}
                onChange={handleFullNameInput}
                autoComplete="off"
                required
              />

              <label htmlFor="password">Пароль:</label>
              <input
                type="password"
                id="password"
                onChange={handlePassordInput}
                value={password}
                required
              />
              <button className="btn-signin">Создать</button>
              <button
                className="btn-signup"
                type="button"
                onClick={clickSignUp}
              >
                У меня уже есть аккаунт
              </button>
            </form>
          </section>
        </div>
      </div>
    </>
  );

  return content;
};

export default Register;
