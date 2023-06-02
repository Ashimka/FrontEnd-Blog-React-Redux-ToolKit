// import { useState } from "react";

import { useGetTagsListQuery } from "../features/posts/postsApiSlice";

const TagsList = () => {
  const { data: tag } = useGetTagsListQuery();
  //   const [tags, setTags] = useState("");
  console.log(tag);
  let content;

  content = (
    <>
      <select multiple>
        {tag?.map((tag, index) => {
          return (
            <option key={index} value={tag.tag}>
              {tag.tag}
            </option>
          );
        })}
      </select>
    </>
  );

  return content;
};

export default TagsList;
