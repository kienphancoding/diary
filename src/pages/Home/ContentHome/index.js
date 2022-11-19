import { Fragment, useState, useEffect } from "react";
import clsx from "clsx";
import style from "./ContentHome.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faSave,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Input_Max_Length } from "../../../layout/components/Create/CreateDiary";

const ContentHome = ({ month, year }) => {
  const [item, setItem] = useState(() => {
    return JSON.parse(localStorage.getItem("diary")) ?? [];
  });

  const [isEdit, setIsEdit] = useState(false);
  const [indexItem, setIndexItem] = useState(0);
  const [titleEdit, setTitleEdit] = useState();
  const [contentEdit, setContentEdit] = useState();

  useEffect(() => {
    setItem(() => {
      return JSON.parse(localStorage.getItem("diary")) ?? [];
    });
  }, [isEdit]);

  const handleDelete = (index) => {
    const storage = JSON.parse(localStorage.getItem("diary"));
    const a1 = storage.slice(0, index);
    const a2 = storage.slice(index + 1, storage.length);
    const new_arr = a1.concat(a2);

    setItem(new_arr);

    const storageJson = JSON.stringify(new_arr);
    localStorage.setItem("diary", storageJson);
    if (item.length === 1) {
      localStorage.removeItem("diary");
    }
  };

  const handleEdit = (index, initTitle, initContent) => {
    setIsEdit(true);
    setIndexItem(index);
    setTitleEdit(initTitle);
    setContentEdit(initContent);
  };

  const handleSave = (index) => {
    if (titleEdit.trim().length <= Input_Max_Length) {
      //thay doi giao dien
      setIsEdit(false);

      //thay doi du lieu trong storage
      const storage = JSON.parse(localStorage.getItem("diary")) ?? [];
      storage[index].title = titleEdit;
      storage[index].content = contentEdit;
      localStorage.setItem("diary", JSON.stringify(storage));
    }
  };

  return (
    <div>
      {item.map((x, index) => {
        if (Number(x.month) === month && Number(x.year) === year) {
          return isEdit && indexItem === index ? (
            <div className={clsx(style.item)} key={index}>
              <div className={clsx(style.header)}>
                {/* <div className={clsx(style.date)}>{x.date}</div> */}
                {/* <div className={clsx(style.title)}>{x.title}</div> */}
                <input
                  value={titleEdit}
                  onChange={(e) => setTitleEdit(e.target.value)}
                  spellCheck="false"
                />
                
                <div className={clsx(style.wrapperRight)}>
                  <div className={clsx(style.mood)}>{x.mood}</div>
                  <div className={clsx(style.menu)}>
                    <div
                      onClick={() => handleSave(index)}
                      className={clsx(style.btn)}
                    >
                      <FontAwesomeIcon icon={faSave} />
                    </div>
                  </div>
                </div>
              </div>
              <p
                  className={clsx(style.maxLength)}
                  style={
                    titleEdit.trim().length > Input_Max_Length
                      ? { color: "red" }
                      : {}
                  }
                >
                  {titleEdit.trim().length}/{Input_Max_Length}
                </p>
              <textarea
                className={clsx(style.textarea)}
                value={contentEdit}
                onChange={(e) => setContentEdit(e.target.value)}
                spellCheck="false"
              ></textarea>
            </div>
          ) : (
            <div className={clsx(style.item)} key={index}>
              <div className={clsx(style.header)}>
                <div className={clsx(style.date)}>{x.date}</div>
                <div className={clsx(style.title)}>{x.title}</div>
                <div className={clsx(style.wrapperRight)}>
                  <div className={clsx(style.mood)}>{x.mood}</div>
                  <div className={clsx(style.menu)}>
                    <div
                      onClick={() => handleEdit(index, x.title, x.content)}
                      className={clsx(style.btn)}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </div>

                    <div
                      onClick={() => handleDelete(index)}
                      className={clsx(style.btn)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </div>
                  </div>
                </div>
              </div>
              <div className={clsx(style.content)}>{x.content}</div>
            </div>
          );
        } else {
          return <Fragment key={index}></Fragment>;
        }
      })}
    </div>
  );
};

export default ContentHome;
