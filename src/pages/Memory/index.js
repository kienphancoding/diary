import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import style from "./Memory.module.scss";
import { useState } from "react";

const Memory = () => {
  const [item, setItem] = useState(() => {
    return JSON.parse(localStorage.getItem("memories")) ?? [];
  });
  return (
    <div className={clsx(style.wrapper)}>
      {!!localStorage.getItem("memories") && (
        <h1
          className={clsx(style.title)}
          style={{
            padding: "20px 30px",
            margin: "10px 30px",
            textAlign: "center",
            boxShadow:
              "rgba(45, 35, 66, 0.4) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #d6d6e7 0 -3px 0 inset",
          }}
        >
          Cột mốc quan trọng trong cuộc đời tôi
        </h1>
      )}
      {!!localStorage.getItem("memories") &&
        item.map((x, index) => {
          return (
            <div
              key={index}
              style={{
                padding: "20px 30px",
                margin: "10px 30px",
                boxShadow:
                  "rgba(45, 35, 66, 0.4) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #d6d6e7 0 -3px 0 inset",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h1 className={clsx(style.title)}>{x.title}</h1>
                <div style={{ display: "flex" }}>
                  <div className={clsx(style.btn)}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </div>
                  <div
                    onClick={() => {
                      const storage = JSON.parse(
                        localStorage.getItem("memories")
                      );
                      const a1 = storage.slice(0, index);
                      const a2 = storage.slice(index + 1, storage.length);
                      const new_arr = a1.concat(a2);

                      setItem(new_arr);

                      const storageJson = JSON.stringify(new_arr);
                      localStorage.setItem("memories", storageJson);
                      if (item.length === 1) {
                        localStorage.removeItem("memories");
                      }
                    }}
                    className={clsx(style.btn)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </div>
                </div>
              </div>
              <p className={clsx(style.content)}>{x.content}</p>
            </div>
          );
        })}
      {!localStorage.getItem("memories") && (
        <div>
          <p
            style={{ fontSize: "30px", fontWeight: "600", textAlign: "center" }}
          >
            Bạn chưa tạo kí ức đáng nhớ nào hãy tạo nó
          </p>
          <img
            style={{ width: "100%", height: "500px", padding: "0 150px" }}
            alt="Ảnh bìa"
            src="https://i.pinimg.com/564x/0e/27/5d/0e275d3b0e574ba07bab319e4269e849.jpg"
          />
          <p
            style={{ fontSize: "30px", fontWeight: "600", textAlign: "center" }}
          >
            Hãy tạo khoảng kí ức của riêng bạn , các cột mốc đáng nhớ của bạn
          </p>
        </div>
      )}
    </div>
  );
};

export default Memory;
