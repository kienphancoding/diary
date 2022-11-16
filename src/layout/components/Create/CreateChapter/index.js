import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import style from "./CreateChapter.module.scss";

const CreateChapter = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, [title]);
  // const [contents,setContents] = useState([])

  const handleSubmit=()=>{
    if (!!localStorage.getItem("chapter")) {
      localStorage.setItem(
        "chapter",
        JSON.stringify([
          ...JSON.parse(localStorage.getItem("chapter")),
          {
            title: title,
            content: content,
          },
        ])
      );
    } else {
      localStorage.setItem(
        "chapter",
        JSON.stringify([
          {
            title: title,
            content: content,
          },
        ])
      );
    }

    setContent("");
    setTitle("");
  }
  return (
    <div className={clsx(style.wrapper)}>
      <input
        type="text"
        placeholder="Nhập cột mốc"
        value={title ===""?"":title[0].toUpperCase().concat(title.slice(1))}
        onChange={(e) => setTitle(e.target.value)}
        spellCheck="false"
        ref={inputRef}
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        spellCheck="false"
        placeholder="Nhập nội dung"
      ></textarea>
      <button
        onClick={handleSubmit}
      >
        OK
      </button>
    </div>
  );
};

export default CreateChapter;
