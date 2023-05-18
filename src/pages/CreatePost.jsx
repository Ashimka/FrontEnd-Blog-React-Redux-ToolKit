import { useState, useRef, useMemo } from "react";
import SimpleMDE from "react-simplemde-editor";

import "easymde/dist/easymde.min.css";
import "./styles/createPost.css";

import { useCreateNewPostMutation } from "../features/posts/postsApiSlice";
import { useCallback } from "react";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [imageURL, setImageURL] = useState("");

  const [errMsg, setErrMsg] = useState("");

  const imageRef = useRef();
  const titleRef = useRef();

  const errRef = useRef();

  const [createPost, { isLoading, isSuccess }] = useCreateNewPostMutation();

  let content;

  const onChange = useCallback((text) => {
    setText(text);
  }, []);

  const options = useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "350px",
      autofocus: true,
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("title", title);
      data.append("text", text);
      data.append("imageURL", imageURL);

      await createPost(data).unwrap();

      setTitle("");
      setText("");
      setImageURL("");
    } catch (error) {
      console.log(error);

      if (error.status === 500) {
        setErrMsg("Заполните поля");
      }
    }
  };

  const CustomInputFile = () => imageRef.current.click();
  const HandleImageInput = (e) => setImageURL(e.target.files[0]);
  const HandleTitleInput = (e) => setTitle(e.target.value);

  if (isLoading) content = <p>Загрузка...</p>;
  if (!isSuccess) content = <p>Пост создан</p>;

  content = (
    <>
      {isSuccess ? (
        <p>Пост создан</p>
      ) : (
        <>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <form onSubmit={handleSubmit} className="create-post">
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
            </label>
            <div className="">
              {imageURL && (
                <img src={URL.createObjectURL(imageURL)} alt={imageURL.name} />
              )}
            </div>
            <label htmlFor="title">
              <input
                type="text"
                placeholder="Заголовок:"
                id="title"
                ref={titleRef}
                value={title}
                onChange={HandleTitleInput}
              />
            </label>
            <label htmlFor="simplemde-editor-1">
              <SimpleMDE value={text} onChange={onChange} options={options} />
            </label>
            <button className="btn-form-submit">Добавить</button>
          </form>
        </>
      )}
    </>
  );

  return content;
};

export default CreatePost;
