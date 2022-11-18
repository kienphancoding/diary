import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import style from "./CreatePeople.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const CreatePeople = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [nickname, setNickname] = useState("");
  const [linkImage, setLinkImage] = useState("");
  const [personalityItem, setPersonalityItem] = useState("");
  const [personalityList, setPersonalityList] = useState([]);

  const [time, setTime] = useState("");
  const [diary, setDiary] = useState("");
  const [timelapse, setTimelapse] = useState([]);

  const inputRef = useRef();
  const personRef = useRef();
  const timelapseRef = useRef();

  useEffect(() => {
    personRef.current.focus();
  }, [personalityItem]);
  useEffect(() => {
    timelapseRef.current.focus();
  }, [time]);
  useEffect(() => {
    inputRef.current.focus();
  }, [title]);
  // const [contents,setContents] = useState([])

  const handleSubmit = () => {
    if (
      title.trim() !== "" &&
      content.trim() !== "" &&
      nickname.trim() !== ""
    ) {
      if (!!localStorage.getItem("characters")) {
        localStorage.setItem(
          "characters",
          JSON.stringify([
            ...JSON.parse(localStorage.getItem("characters")),
            {
              title: title.trim(),
              content: content.trim(),
              nickname: nickname.trim(),
              linkImage:
                linkImage === ""
                  ? "https://i.pinimg.com/564x/6e/08/97/6e08971bc765d9ec11a9a3d259875dd3.jpg"
                  : linkImage.trim(),
              personalities: personalityList,
              timelapse: timelapse,
            },
          ])
        );
      } else {
        localStorage.setItem(
          "characters",
          JSON.stringify([
            {
              title: title.trim(),
              content: content.trim(),
              nickname: nickname.trim(),
              linkImage:
                linkImage === ""
                  ? "https://i.pinimg.com/564x/6e/08/97/6e08971bc765d9ec11a9a3d259875dd3.jpg"
                  : linkImage.trim(),
              personalities: personalityList,
              timelapse: timelapse,
            },
          ])
        );
      }
      setContent("");
      setTitle("");
      setNickname("");
      setLinkImage("");
      setDiary("");
      setTime("");
      setTimelapse([]);
      setPersonalityItem("");
      setPersonalityList([]);
    }
  };

  const handlePersonality = () => {
    if (personalityItem.trim() !== "") {
      setPersonalityList((prev) => [...prev, personalityItem]);
      setPersonalityItem("");
    }
  };

  const handleDelete = (index) => {
    const a1 = personalityList.slice(0, index);
    const a2 = personalityList.slice(index + 1, personalityList.length);
    const new_arr = a1.concat(a2);
    setPersonalityList(new_arr);
  };
  return (
    <div className={clsx(style.wrapper)}>
      <input
        type="text"
        placeholder="Nhập tên"
        value={
          title === "" ? "" : title[0].toUpperCase().concat(title.slice(1))
        }
        onChange={(e) => setTitle(e.target.value)}
        spellCheck="false"
        ref={inputRef}
      />
      <input
        type="text"
        placeholder="Đặt biệt danh"
        value={
          nickname === ""
            ? ""
            : nickname[0].toUpperCase().concat(nickname.slice(1))
        }
        onChange={(e) => setNickname(e.target.value)}
        spellCheck="false"
      />
      <input
        type="text"
        placeholder="Dán link ảnh nó vào"
        value={linkImage}
        onChange={(e) => setLinkImage(e.target.value)}
        spellCheck="false"
      />
      <img
        style={{
          display: "flex",
          margin: "0 auto",
          width: "300px",
          height: "400px",
          backgroundColor: "black",
          color: "white",
        }}
        src={
          linkImage === ""
            ? "https://i.pinimg.com/564x/6e/08/97/6e08971bc765d9ec11a9a3d259875dd3.jpg"
            : linkImage
        }
        alt="Ảnh bị lỗi"
      />
      <input
        type="text"
        placeholder="Nhập tính cách,mô tả về họ"
        value={
          personalityItem === ""
            ? ""
            : personalityItem[0].toUpperCase().concat(personalityItem.slice(1))
        }
        onChange={(e) => setPersonalityItem(e.target.value)}
        spellCheck="false"
        ref={personRef}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handlePersonality();
          }
        }}
      />
      <button onClick={handlePersonality}>Add</button>
      {personalityList.map((x, index) => {
        return (
          <div style={{ display: "flex" }}>
            <p className={clsx(style.personItem)} key={index}>
              {x}
            </p>
            <div
              className={clsx(style.trash)}
              onClick={() => {
                handleDelete(index);
              }}
            >
              <FontAwesomeIcon icon={faTrash} />
            </div>
          </div>
        );
      })}

      <input
        type="text"
        placeholder="Mốc thời gian"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        spellCheck="false"
        ref={timelapseRef}
      />
      <textarea
        type="text"
        placeholder="Chuyện gì đã xảy trong thời gian đó"
        value={diary}
        onChange={(e) => setDiary(e.target.value)}
        spellCheck="false"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            if (time.trim() !== "" && diary.trim() !== "") {
              setTimelapse((prev) => [...prev, { time: time, diary: diary }]);
              setTime("");
              setDiary("");
            }
          }
        }}
      ></textarea>
      <button
        onClick={() => {
          if (time.trim() !== "" && diary.trim() !== "") {
            setTimelapse((prev) => [...prev, { time: time, diary: diary }]);
            setTime("");
            setDiary("");
          }
        }}
      >
        Add
      </button>
      {timelapse.map((x, index) => {
        return (
          <div
            key={index}
            style={{
              border: "1px solid black",
              borderRadius: "20px",
              marginBottom: "10px",
            }}
          >
            <p
              style={{
                fontSize: "30px",
                textAlign: "center",
                fontWeight: "600",
                borderBottom: "1px solid black",
              }}
            >
              {x.time}
            </p>
            <p style={{ fontSize: "25px", fontWeight: "500", padding: "20px" }}>
              {x.diary}
            </p>
          </div>
        );
      })}

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        spellCheck="false"
        placeholder="Người đó ntn với bạn"
      ></textarea>
      <button onClick={handleSubmit}>OK</button>
    </div>
  );
};

export default CreatePeople;
