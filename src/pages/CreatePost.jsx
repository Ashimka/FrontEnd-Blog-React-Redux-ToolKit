import { useState, useRef } from "react";

import { useCreateNewPostMutation } from "../features/posts/postsApiSlice";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [imageURL, setImageURL] = useState("");

  const [errMsg, setErrMsg] = useState("");

  const imageRef = useRef();
  const titleRef = useRef();
  const textRef = useRef();

  const errRef = useRef();

  const [createPost, { isLoading, isSuccess }] = useCreateNewPostMutation();

  let content;

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

  const HandleImageInput = (e) => setImageURL(e.target.files[0]);
  const HandleTitleInput = (e) => setTitle(e.target.value);
  const HandleTextInput = (e) => setText(e.target.value);

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
          <form onSubmit={handleSubmit}>
            <label htmlFor="image">
              Прикрепить изорбажение:
              <input
                type="file"
                id="image"
                ref={imageRef}
                onChange={HandleImageInput}
              />
            </label>
            <div className="">
              {imageURL && (
                <img src={URL.createObjectURL(imageURL)} alt={imageURL.name} />
              )}
            </div>
            <label htmlFor="title">
              Заголовок:
              <input
                type="text"
                id="title"
                ref={titleRef}
                value={title}
                onChange={HandleTitleInput}
              />
            </label>
            <label htmlFor="text">
              Содержимое поста :
              <textarea
                id="text"
                ref={textRef}
                value={text}
                onChange={HandleTextInput}
              ></textarea>
            </label>
            <button>Добавить</button>
          </form>
        </>
      )}
    </>
  );

  return content;
};

export default CreatePost;
