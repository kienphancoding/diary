import { Fragment, useState } from "react";
import clsx from "clsx";
import style from "./ContentHome.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

const ContentHome = ({ month, year }) => {
  const [item, setItem] = useState(() => {
    return JSON.parse(localStorage.getItem("diary")) ?? [];
  });

  return (
    <div>
      {item.map((x, index) => {
        if (Number(x.month) === month && Number(x.year) === year) {
          return (
            <div
              className={clsx(style.item)}
              key={index}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between",marginBottom:"10px" }}>
                <div className={clsx(style.date)}>{x.date}</div>
                <div className={clsx(style.title)}>{x.title}</div>
                <div className={clsx(style.wrapperRight)}>
                  <div className={clsx(style.mood)}>{x.mood}</div>
                  <div className={clsx(style.menu)}>
                    <div className={clsx(style.btn)}>
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </div>
                    <div
                      onClick={() => {
                        const storage = JSON.parse(
                          localStorage.getItem("diary")
                        );
                        const a1 = storage.slice(0, index);
                        const a2 = storage.slice(index + 1, storage.length);
                        const new_arr = a1.concat(a2);

                        setItem(new_arr);

                        const storageJson = JSON.stringify(new_arr);
                        localStorage.setItem("diary", storageJson);
                        if (item.length === 1) {
                          localStorage.removeItem("diary");
                        }
                      }}
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
