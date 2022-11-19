import { Link } from "react-router-dom";
import clsx from "clsx";
import style from "./CharacterHeader.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const CharacterHeader = () => {
  //   const item = JSON.parse(localStorage.getItem("characters")) ?? [];

  const [item, setItem] = useState(() => {
    return JSON.parse(localStorage.getItem("characters")) ?? [];
  });

  return (
    <div className={clsx(style.wrapper)}>
      {item.map((x, index) => {
        return (
          <div style={{ display: "flex", flexDirection: "column" }} key={index}>
            <Link className={clsx(style.link)} to={`/characters${index + 1}`}>
              <img src={x.linkImage} alt="Avatar"/>
              <p className={clsx(style.name)}>{x.nickname}</p>
            </Link>
            <div
              className={clsx(style.link)}
              style={{ display: "flex", justifyContent: "center",marginTop:"15px" }}
              onClick={() => {
                const storage = JSON.parse(localStorage.getItem("characters"));
                const a1 = storage.slice(0, index);
                const a2 = storage.slice(index + 1, storage.length);
                const new_arr = a1.concat(a2);

                setItem(new_arr);

                const storageJson = JSON.stringify(new_arr);
                localStorage.setItem("characters", storageJson);
                if (item.length === 1) {
                  localStorage.removeItem("characters");
                }
              }}
            >
              <FontAwesomeIcon style={{ fontSize: "20px" }} icon={faTrash} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CharacterHeader;
