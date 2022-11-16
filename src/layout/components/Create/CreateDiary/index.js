import clsx from "clsx";
import style from "./CreateDiary.module.scss";
import { moods } from "../../Create";
import { useState,useEffect, useRef} from "react";

const CreateDiary = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState(moods[0]);
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, [title]);
  return (
    <div className={clsx(style.wrapper)}>
      <input
        type="text"
        placeholder="Nhập tiêu đề"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        spellCheck="false"
        ref={inputRef}
      />
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
        value={content}
        onChange={(e) => setContent(e.target.value)}
        spellCheck="false"
        placeholder="Nhập nội dung"
      ></textarea>
      <button
        onClick={() => {
          if (!!localStorage.getItem("diary")) {
            localStorage.setItem(
              "diary",
              JSON.stringify([
                ...JSON.parse(localStorage.getItem("diary")),
                {
                  date: new Date().getDate(),
                  month: new Date().getMonth() + 1,
                  year: new Date().getFullYear(),
                  content: content,
                  title: title,
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
                  content: content,
                  title: title,
                  mood: mood,
                },
              ])
            );
          }

          setContent("");
          setMood(moods[0]);
          setTitle("");
        }}
      >
        OK
      </button>
    </div>
  );
};

export default CreateDiary;
