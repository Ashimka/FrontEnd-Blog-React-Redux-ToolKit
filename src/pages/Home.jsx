import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import {
  useGetPostsQuery,
  useRemovePostMutation,
} from "../features/posts/postsApiSlice";
import { useGetOneUserQuery } from "../features/users/usersApiSlice";

import "./styles/home.css";

const Home = () => {
  const avatarDefault = "profile.png";
  const views = "show.png";
  const { data: posts, isLoading, isSuccess } = useGetPostsQuery();
  const { data: user } = useGetOneUserQuery();
  const [removePost] = useRemovePostMutation();

  const handleRemovePost = async (id) => {
    window.confirm("Удалить пост?");
    await removePost(id);
  };

  let content;

  if (isLoading) content = <p>"Загрузка..."</p>;

  if (isSuccess) {
    content = (
      <>
        <section className="posts">
          {posts.map((post, id) => {
            return (
              <div key={id} className="post">
                <div className="post__header">
                  <div className="header-avatar">
                    <img
                      className="avatar-image"
                      src={`http://localhost:5006/uploads/${
                        post.user.avatarURL || avatarDefault
                      }`}
                      alt={"avatar"}
                    />
                  </div>
                  <div className="header-name">{post.user.fullName}</div>
                  {user?.role.admin && (
                    <button
                      onClick={() => handleRemovePost(post.id)}
                      className="header-delete-post"
                    >
                      delete
                    </button>
                  )}
                </div>
                <div className="post__title">
                  <Link to={`/post/${post.id}`}>
                    <h2 className="post__title-h2">{post.title}</h2>
                  </Link>
                </div>
                <div className="post__img">
                  {post.imageURL && (
                    <img
                      className="post-image"
                      src={`http://localhost:5006/uploads/${post.imageURL}`}
                      alt={post.title}
                    />
                  )}
                </div>

                <div className="post__text">
                  <ReactMarkdown children={post.text} />
                </div>

                <div className="post__footer">
                  <div className="post__views">
                    <img
                      className="views-image"
                      src={`http://localhost:5006/uploads/${views}`}
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
      </>
    );
  }
  return content;
};

export default Home;
