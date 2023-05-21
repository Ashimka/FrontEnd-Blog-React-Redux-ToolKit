import { useState, useRef, useMemo, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import SimpleMDE from "react-simplemde-editor";

import {
  useUpdatePostMutation,
  useGetFullPostQuery,
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
  const [imageURL, setImageURL] = useState("");

  const [errMsg, setErrMsg] = useState("");

  const imageRef = useRef();
  const titleRef = useRef();

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

  // const editPost = () => {
  //   setTitle(data.post.title);
  //   setText(data.post.text);
  //   setOldImageURL(data.post.imageURL);
  // };

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
      const formData = new FormData();

      formData.append("title", title);
      formData.append("text", text);
      formData.append("imageURL", imageURL);
      formData.append("id", id);

      await updatePost(id, formData).unwrap();
    } catch (error) {
      console.log(error);

      if (error.status === 500) {
        setErrMsg("Заполните поля");
      }
    }
  };

  useEffect(() => {
    editPost();
  }, [editPost]);

  const CustomInputFile = () => imageRef.current.click();
  const HandleImageInput = (e) => {
    setImageURL(e.target.files[0]);
    setOldImageURL("");
  };
  const HandleTitleInput = (e) => setTitle(e.target.value);

  if (isLoading) content = <p>Загрузка...</p>;

  content = (
    <>
      {isSuccess ? (
        <p>Пост от редактирован</p>
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
                {imageURL && (
                  <img
                    className="post__img"
                    src={URL.createObjectURL(imageURL)}
                    alt={imageURL.name}
                  />
                )}
              </div>
            </label>

            <label htmlFor="title">
              <input
                className="create-post__title"
                type="text"
                placeholder="Заголовок"
                id="title"
                ref={titleRef}
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
