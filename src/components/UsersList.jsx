import { useGetUsersQuery } from "../features/users/usersApiSlice";
import { Link } from "react-router-dom";
import Header from "./Header";

const UsersList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery();

  let content;

  if (isLoading) {
    content = <p>"Загрузка..."</p>;
  } else if (isSuccess) {
    content = (
      <>
        <Header />
        <section className="users">
          <h1>Список пользователей</h1>
          <ul>
            {users.map((user, i) => {
              return <li key={i}>{user.email}</li>;
            })}
          </ul>
          <Link to="/welcome">Назад на главную</Link>
        </section>
      </>
    );
  } else if (isError) {
    console.log(error);
    content = <p>{JSON.stringify(error || error.message)}</p>;
  }

  return content;
};

export default UsersList;
