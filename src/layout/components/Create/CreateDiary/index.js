import clsx from "clsx";
import style from "./CreateDiary.module.scss";
import { moods } from "../../Create";
import { useState, useEffect, useRef } from "react";

export const Input_Max_Length = 50;

const CreateDiary = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState(moods[0]);
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
      if (!!localStorage.getItem("diary")) {
        localStorage.setItem(
          "diary",
          JSON.stringify([
            ...JSON.parse(localStorage.getItem("diary")),
            {
              date: new Date().getDate(),
              month: new Date().getMonth() + 1,
              year: new Date().getFullYear(),
              content: content.trim(),
              title: title.trim(),
              mood: mood,
            },
          ])
        );
      } else {
        localStorage.setItem(
          "diary",
          JSON.stringify([
            {
              date: new Date().getDate(),
              month: new Date().getMonth() + 1,
              year: new Date().getFullYear(),
              content: content.trim(),
              title: title.trim(),
              mood: mood,
            },
          ])
        );
      }

      setContent("");
      setMood(moods[0]);
      setTitle("");
    }
  };

  return (
    <div className={clsx(style.wrapper)}>
      <input
        type="text"
        placeholder="Ngày hôm nay của bạn như thế nào?"
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
      <div className={clsx(style.moods)}>
        {moods.map((x, index) => {
          return (
            <div
              className={clsx(style.moodItem)}
              key={index}
              style={mood === moods[index] ? { border: "3px solid black" } : {}}
              onClick={() => setMood(x)}
            >
              {x}
            </div>
          );
        })}
      </div>
      <textarea
        value={
          content === ""
            ? ""
            : content[0].toUpperCase().concat(content.slice(1))
        }
        onChange={(e) => setContent(e.target.value)}
        spellCheck="false"
        placeholder="Nhập nội dung"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
      ></textarea>
      <button onClick={handleSubmit}>OK</button>
    </div>
  );
};

export default CreateDiary;
