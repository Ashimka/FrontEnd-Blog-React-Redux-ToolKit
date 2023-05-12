import { Link } from "react-router-dom";

import { useGetOneUserQuery } from "../features/users/usersApiSlice";

import "./styles/userPage.css";

const UserPage = () => {
  const avatarDefault = "profile.png";
  const { data: user, isSuccess } = useGetOneUserQuery();

  let content;

  if (isSuccess) {
    content = (
      <>
        <div className="container">
          <section className="user">
            <div className="user__header">
              <div className="user__header-avatar">
                <img
                  className="user__avatar-image"
                  src={`http://localhost:5006/${
                    user.avatarURL || avatarDefault
                  }`}
                  alt="avatar"
                />
              </div>
              <div className="user__name">{user.fullName}</div>
            </div>
            <div className="user__options">
              <Link>Добавить пост</Link>
              <Link>Мои посты</Link>
            </div>
            <p>
              <Link to="/user/all">Перейдите к списку пользователей</Link>
            </p>
          </section>
        </div>
      </>
    );
  }

  return content;
};

export default UserPage;
