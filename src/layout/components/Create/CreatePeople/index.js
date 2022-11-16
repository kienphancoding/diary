import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import style from "./CreatePeople.module.scss";

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
  const personRef = useRef()
  useEffect(() => {
    inputRef.current.focus();
  }, [title]);
  useEffect(() => {
    personRef.current.focus()
  }, [personalityItem]);
  // const [contents,setContents] = useState([])

  const handleSubmit = () => {
    if (!!localStorage.getItem("characters")) {
      localStorage.setItem(
        "characters",
        JSON.stringify([
          ...JSON.parse(localStorage.getItem("characters")),
          {
            title: title,
            content: content,
            nickname:nickname,
            linkImage:linkImage,
            personalities:personalityList,
            timelapse:timelapse
          },
        ])
      );
    } else {
      localStorage.setItem(
        "characters",
        JSON.stringify([
          {
            title: title,
            content: content,
            nickname:nickname,
            linkImage:linkImage,
            personalities:personalityList,
            timelapse:timelapse
          },
        ])
      );
    }
    setContent("");
    setTitle("");
    setNickname("")
    setLinkImage("")
    setDiary("")
    setTime("")
    setTimelapse([])
    setPersonalityItem("")
    setPersonalityList([])
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
        placeholder="Đặt biệt danh cho nó"
        value={
          nickname === "" ? "" : nickname[0].toUpperCase().concat(nickname.slice(1))
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
      <input
        type="text"
        placeholder="Nhập tính cách,mô tả về họ"
        value={
          personalityItem === "" ? "" : personalityItem[0].toUpperCase().concat(personalityItem.slice(1))
        }
        onChange={(e) => setPersonalityItem(e.target.value)}
        spellCheck="false"
        ref={personRef}
      />
      <button onClick={()=>{
        setPersonalityList(prev=>[...prev,personalityItem])
        setPersonalityItem("")
      }}>Add</button>
      {personalityList.map((x,index)=>{
        return(
            <p key={index}>{x}</p>
        )
      })}

        <input
        type="text"
        placeholder="Mốc thời gian"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        spellCheck="false"
      />
      <input
        type="text"
        placeholder="Chuyện gì đã xảy trong thời gian đó"
        value={diary}
        onChange={(e) => setDiary(e.target.value)}
        spellCheck="false"
      />
      <button onClick={()=>{
        setTimelapse(prev=>[...prev,{time:time,diary:diary}])
        setTime("")
        setDiary("")
      }}>Add</button>
        {timelapse.map((x,index)=>{
        return(
            <div key={index}>
                <p>{x.time}</p>
                <p>{x.diary}</p>
            </div>
        )
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
}
 
export default CreatePeople;