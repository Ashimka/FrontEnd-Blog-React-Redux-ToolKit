import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  selectCurrentUser,
  selectCurrentToken,
} from "../features/auth/authSlice";
import Header from "./Header";

const Welcome = () => {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);

  const welcome = user ? `Welcome ${user}!` : "Welcome!";
  const tokenAbbr = `${token.slice(0, 9)}...`;

  const content = (
    <>
      <Header />
      <section className="welcome">
        <h1>{welcome}</h1>
        <p>Token: {tokenAbbr}</p>
        <p>
          <Link to="/user/all">Перейдите к списку пользователей</Link>
        </p>
      </section>
    </>
  );
  return content;
};

export default Welcome;
