import React from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { useGetFullPostQuery } from "../features/posts/postsApiSlice";

import "./styles/home.css";

const FullPost = () => {
  const params = useParams();
  const { data: post, isLoading, isSuccess } = useGetFullPostQuery(params.id);

  const avatarDefault = "profile.png";
  const views = "show.png";

  let content;

  if (isLoading) content = <p>"Загрузка..."</p>;

  if (isSuccess) {
    content = (
      <>
        <section className="posts">
          <div className="post">
            <div className="post__header">
              <div className="header-avatar">
                <img
                  className="avatar-image"
                  src={`http://localhost:5006/uploads/${
                    post.post.user.avatarURL || avatarDefault
                  }`}
                  alt="avatar"
                />
              </div>
              <div className="header-name">{post.post.user.fullName}</div>
            </div>
            <div className="post__title">
              <h2 className="post__title-h2">{post.post.title}</h2>
            </div>
            <div className="post__img">
              {post.post.imageURL && (
                <img
                  className="post-image"
                  src={`http://localhost:5006/uploads/${post.post.imageURL}`}
                  alt={post.title}
                />
              )}
            </div>

            <div className="post__text">
              <ReactMarkdown children={post.post.text} />
            </div>

            <div className="post__footer">
              <div className="post__views">
                <img
                  className="views-image"
                  src={`http://localhost:5006/uploads/${views}`}
                  alt="views"
                />
                <span>{post.post.viewsCount}</span>
              </div>
              <div className="post__comment">
                <span>{post.post.tag_post.tagOne}</span>
                <span>{post.post.tag_post.tagTwo}</span>
                <span>{post.post.tag_post.tagThree}</span>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  return content;
};

export default FullPost;
