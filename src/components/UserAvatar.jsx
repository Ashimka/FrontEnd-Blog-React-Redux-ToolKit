import { useState, useRef } from "react";

import { useUploadImageMutation } from "../features/posts/postsApiSlice";
import { useUpdateAvatarUserMutation } from "../features/users/usersApiSlice";

const UserAvatar = () => {
  const [avatar, setAvatar] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const imageRef = useRef(null);
  const errRef = useRef();

  const [fileUpload] = useUploadImageMutation();
  const [createAvatar, { isLoading, isSuccess }] =
    useUpdateAvatarUserMutation();

  let content;

  const HandleImageInput = async (e) => {
    try {
      const formData = new FormData();

      formData.append("image", e.target.files[0]);

      const file = await fileUpload(formData).unwrap();
      setAvatar(file.url);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        avatarURL: avatar,
      };

      await createAvatar(data).unwrap();

      setAvatar("");
    } catch (error) {
      console.log(error);
      setErrMsg(error);
    }
  };

  const CustomInputFile = () => imageRef.current.click();

  if (isLoading) content = <p>Загрузка....</p>;

  content = (
    <>
      {isSuccess ? (
        <p>Avatar добавлен</p>
      ) : (
        <>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <form encType="multipart/form-data" onSubmit={handleSubmit}>
            <label htmlFor="image">
              <button
                type="button"
                className="btn-form-image"
                onClick={CustomInputFile}
              >
                Добавить изорбажение
              </button>
              <input
                name="image"
                type="file"
                accept=".jpeg, .jpg, .png, .webp"
                id="image"
                ref={imageRef}
                onChange={HandleImageInput}
                hidden
              />
            </label>
            <div className="create-post__image">
              {avatar && (
                <>
                  <button
                    className="create-post__btn-delete-img"
                    onClick={() => setAvatar("")}
                  >
                    удалить
                  </button>
                  <img
                    className="post__img"
                    src={`http://localhost:5006/uploads${avatar}`}
                    alt={avatar.name}
                  />
                </>
              )}
            </div>
            <button>ok</button>
          </form>
        </>
      )}
    </>
  );

  return content;
};

export default UserAvatar;
