import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import style from "./CreateMomment.module.scss";
import {Input_Max_Length} from "../CreateDiary"

const CreateMomment = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, [title]);

  const handleSubmit = () => {
    if (
      title.trim() !== "" &&
      content.trim() !== "" &&
      title.trim().length <= Input_Max_Length
    ) {
      if (!!localStorage.getItem("momment")) {
        localStorage.setItem(
          "momment",
          JSON.stringify([
            ...JSON.parse(localStorage.getItem("momment")),
            {
              title: title.trim(),
              content: content.trim(),
            },
          ])
        );
      } else {
        localStorage.setItem(
          "momment",
          JSON.stringify([
            {
              title: title.trim(),
              content: content.trim(),
            },
          ])
        );
      }

      setContent("");
      setTitle("");
    }
  };
  return (
    <div className={clsx(style.wrapper)}>
      <input
        type="text"
        placeholder="Nhập một khoảnh khắc trong đời bạn"
        value={
          title === "" ? "" : title[0].toUpperCase().concat(title.slice(1))
        }
        onChange={(e) => setTitle(e.target.value)}
        spellCheck="false"
        ref={inputRef}
      />

      <p
        className={clsx(style.maxLength)}
        style={title.trim().length > Input_Max_Length ? { color: "red" } : {}}
      >
        {title.trim().length}/{Input_Max_Length}
      </p>

      <textarea
        value={
          content === ""
            ? ""
            : content[0].toUpperCase().concat(content.slice(1))
        }
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
        spellCheck="false"
        placeholder="Ví dụ : nụ hôn đầu , đi du lịch với bố mẹ ,...."
      ></textarea>
      <button onClick={handleSubmit}>OK</button>
    </div>
  );
};

export default CreateMomment;
