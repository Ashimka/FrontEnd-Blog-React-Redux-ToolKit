import { useState, useRef, useMemo, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";

import SimpleMDE from "react-simplemde-editor";

import {
  useGetFullPostQuery,
  useUpdatePostMutation,
} from "../features/posts/postsApiSlice";

import "easymde/dist/easymde.min.css";
import "./styles/createPost.css";

const UpdatePost = () => {
  const { id } = useParams();

  const { data } = useGetFullPostQuery(id);
  const [updatePost, { isLoading, isSuccess }] = useUpdatePostMutation();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [oldImageURL, setOldImageURL] = useState("");
  const [newImageURL, setNewImageURL] = useState("");

  const [errMsg, setErrMsg] = useState("");

  const imageRef = useRef();

  const errRef = useRef();

  let content;

  const onChange = useCallback((text) => {
    setText(text);
  }, []);

  const options = useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "350px",
      autofocus: false,
      placeholder: "Содержимое поста...",
      status: false,
      autosave: {
        enabled: true,
        uniqueId: "text-blog",
        delay: 1000,
      },
    }),
    []
  );

  const editPost = useCallback(() => {
    if (data) {
      setTitle(data.post.title);
      setText(data.post.text);
      setOldImageURL(data.post.imageURL);
    }
  }, [data]);

  useEffect(() => {
    if (id && data) {
      editPost();
    }
  }, [id, data, editPost]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updatePost({ id, title, text, imageURL: newImageURL }).unwrap();

      setTitle("");
      setText("");
      setNewImageURL("");
    } catch (error) {
      console.log(error);

      if (error.status === 500) {
        setErrMsg("Internal Server Error");
      }
    }
  };

  useEffect(() => {
    editPost();
  }, [editPost]);

  const CustomInputFile = () => imageRef.current.click();
  const HandleImageInput = (e) => {
    setNewImageURL(e.target.files[0]);
    setOldImageURL("");
  };
  const HandleTitleInput = (e) => setTitle(e.target.value);

  if (isLoading) content = <p>Загрузка...</p>;

  content = (
    <>
      {isSuccess ? (
        <>
          <p>Пост от редактирован</p>
          <Link to={`/post/${id}`}>Проверить</Link>
        </>
      ) : (
        <>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <form className="create-post" onSubmit={handleSubmit}>
            <label htmlFor="image">
              <button
                type="button"
                className="btn-form-image"
                onClick={CustomInputFile}
              >
                Добавить изорбажение
              </button>
              <input
                type="file"
                accept="image/jpeg, image/png, image/gif, image/webp"
                id="image"
                ref={imageRef}
                onChange={HandleImageInput}
                hidden
              />
              <div className="create-post__image">
                {oldImageURL && (
                  <>
                    <button
                      className="create-post__btn-delete-img"
                      onClick={() => setOldImageURL("")}
                    >
                      удалить
                    </button>
                    <img
                      className="post__img"
                      src={`http://localhost:5006/${oldImageURL}`}
                      alt={oldImageURL.name}
                    />
                  </>
                )}
                {newImageURL && (
                  <>
                    <button
                      className="create-post__btn-delete-img"
                      onClick={() => setNewImageURL("")}
                    >
                      удалить
                    </button>
                    <img
                      className="post__img"
                      src={URL.createObjectURL(newImageURL)}
                      alt={newImageURL.name}
                    />
                  </>
                )}
              </div>
            </label>

            <label htmlFor="title">
              <input
                className="create-post__title"
                type="text"
                placeholder="Заголовок"
                id="title"
                value={title}
                onChange={HandleTitleInput}
              />
            </label>
            <label htmlFor="simplemde-editor-1">
              <SimpleMDE value={text} onChange={onChange} options={options} />
            </label>
            <button className="btn-form-submit">Редактировать</button>
          </form>
        </>
      )}
    </>
  );

  return content;
};

export default UpdatePost;
