import clsx from "clsx";
import style from "./Momment.module.scss";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const Momment = () => {
  const [item, setItem] = useState(() => {
    return JSON.parse(localStorage.getItem("mommnent")) ?? [];
  });
  return (
    <div className={clsx(style.wrapper)}>
      {!!localStorage.getItem("momment") && (
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
          Khoảnh khắc đáng nhớ nhất đời tôi
        </h1>
      )}
      {!!localStorage.getItem("momment") &&
        JSON.parse(localStorage.getItem("momment")).map((x, index) => {
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
                    className={clsx(style.btn)}
                    onClick={() => {
                      const storage = JSON.parse(
                        localStorage.getItem("momment")
                      );
                      const a1 = storage.slice(0, index);
                      const a2 = storage.slice(index + 1, storage.length);
                      const new_arr = a1.concat(a2);

                      setItem(new_arr);

                      const storageJson = JSON.stringify(new_arr);
                      localStorage.setItem("momment", storageJson);
                      if (item.length === 1) {
                        localStorage.removeItem("momment");
                      }
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </div>
                </div>
              </div>
              <p className={clsx(style.content)}>{x.content}</p>
            </div>
          );
        })}
      {!localStorage.getItem("momment") && (
        <div>
          <p
            style={{ fontSize: "30px", fontWeight: "600", textAlign: "center" }}
          >
            Bạn chưa tạo khoảnh khắc nào
          </p>
          <img
            style={{ width: "100%", height: "500px", padding: "0 150px" }}
            alt="Ảnh bìa"
            src="https://i.pinimg.com/564x/64/17/91/641791a133f4a206c0249123046927a8.jpg"
          />
          <p
            style={{ fontSize: "30px", fontWeight: "600", textAlign: "center" }}
          >
            Hãy tạo khoảnh khắc bạn cảm thấy vui hoặc buồn nhất trong đời
          </p>
        </div>
      )}
    </div>
  );
};

export default Momment;
