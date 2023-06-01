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
        <section className="user">
          <div className="user__header">
            <div className="user__header-avatar">
              <img
                className="user__avatar-image"
                src={`http://localhost:5006/uploads/${
                  user.avatarURL || avatarDefault
                }`}
                alt="avatar"
              />
            </div>
            <div className="user__name">{user.fullName}</div>
          </div>
          <div className="user__options">
            <Link to={"/post"}>Добавить пост</Link>
            <Link to={"/user/posts"}>Мои посты</Link>
          </div>
          <div className="user__admin">
            {user.role.admin && (
              <>
                <div>
                  <Link to="/user/all">Список пользователей</Link>
                </div>
                <div>
                  <Link to="/post/tags">Создать тег</Link>
                </div>
              </>
            )}
          </div>
        </section>
      </>
    );
  }

  return content;
};

export default UserPage;
