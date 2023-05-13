import { Link } from "react-router-dom";

import { useGetUserPostsQuery } from "../features/users/usersApiSlice";

const UserPosts = () => {
  const avatarDefault = "profile.png";
  const views = "show.png";
  const {
    data: posts,
    isLoading,
    isSuccess,
    currentData,
  } = useGetUserPostsQuery();

  let content;

  if (isLoading) content = <p>"Загрузка..."</p>;

  if (isSuccess && !currentData?.message) {
    content = (
      <>
        <div className="container">
          <section className="posts">
            {posts.map((post, id) => {
              return (
                <div key={id} className="post">
                  <div className="post__header">
                    <div className="header-avatar">
                      <img
                        className="avatar-image"
                        src={`http://localhost:5006/${
                          post.user.avatarURL || avatarDefault
                        }`}
                        alt={"avatar"}
                      />
                    </div>
                    <div className="header-name">{post.user.fullName}</div>
                  </div>
                  <div className="post__title">
                    <Link to={`/post/${post.id}`}>
                      <h2 className="post__title-h2">{post.title}</h2>
                    </Link>
                  </div>
                  <div className="post__img">
                    <img
                      className="post-image"
                      src={`http://localhost:5006/${post.imageURL}`}
                      alt={post.title}
                    />
                  </div>

                  <div className="post__text">{post.text}</div>

                  <div className="post__footer">
                    <div className="post__views">
                      <img
                        className="views-image"
                        src={`http://localhost:5006/${views}`}
                        alt="views"
                      />
                      <span>{post.viewsCount}</span>
                    </div>
                    <div className="post__comment">
                      <span>{post.tag_post.tagOne}</span>
                      <span>{post.tag_post.tagTwo}</span>
                      <span>{post.tag_post.tagThree}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </section>
        </div>
      </>
    );
  }

  if (currentData?.message) {
    content = (
      <div className="container">
        <div className="post">У вас нет постов</div>
      </div>
    );
  }

  return content;
};

export default UserPosts;
