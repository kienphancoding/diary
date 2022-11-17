import clsx from "clsx";
import { useRef, useState } from "react";
import style from "./Create.module.scss";
import CreateChapter from "./CreateChapter";
import CreateDiary from "./CreateDiary";
import CreateMemory from "./CreateMemory";
import CreateMomment from "./CreateMomment";
import CreatePeople from "./CreatePeople";
import useOnClickOutside from "../../../hooks/useOnClickOutside"

export const moods = [
  "Bình thường",
  "Phẫn nộ",
  "Hạnh phúc",
  "Buồn bã",
  "Lo sợ",
  "Chán ghét",
];

const Create = ({setShow}) => {
  const ref = useRef()
  
  useOnClickOutside(ref, () => setShow(false))
  const elements = [
    { name: "Nhật kí hôm nay",component:CreateDiary },
    { name: "Tự truyện",component:CreateChapter },
    { name: "Cột mốc trong đời" ,component:CreateMemory},
    { name: "Khoảnh khắc",component:CreateMomment },
    { name: "Tạo nhân vật",component:CreatePeople },
  ];
  const [type, setType] = useState(elements[0].name);

  
  return (
    <div ref={ref} className={clsx(style.wrapper)}>
      <div style={{display:"flex"}} className={clsx(style.moods)}>
      {elements.map((x, index) => {
        return (
          <div
            style={type === x.name ? { border: "3px solid black" } : {}}
            key={index}
            onClick={() => setType(x.name)}
            className={clsx(style.moodItem)}
          >
            {x.name}
          </div>
        );
      })}
      </div>
      <div>
        {elements.map((x,index)=>{
          let Elements = x.component
          return(
            x.name === type && <div key={index}><Elements/></div>
          )
        })}
      </div>
      
    </div>
  );
};

export default Create;
