import { useGetPostsQuery } from "../features/posts/postsApiSlice";
import Header from "../components/Header";

import React from "react";

const Home = () => {
  const { data: posts, isLoading, isSuccess } = useGetPostsQuery();
  let content;

  if (isLoading) {
    content = <p>"Загрузка..."</p>;
  }

  if (isSuccess) {
    content = (
      <>
        <Header />
        <section className="posts">
          <ul>
            {posts.map((post, id) => {
              return (
                <li key={id}>
                  <div>{post.user.fullName}</div>
                  <h2>{post.title}</h2>
                  <p>{post.text}</p>
                  <img
                    src={`http://localhost:5006/${post.imageURL}`}
                    alt={post.title}
                  />
                  <span>{post.viewsCount}</span>
                  <div className="tag-list">
                    <span>{post.tag_post.tagOne}</span>
                    <span>{post.tag_post.tagTwo}</span>
                    <span>{post.tag_post.tagThree}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </>
    );
  }
  return content;
  //   id, title, text, imageURL, viewsCount
};

export default Home;
