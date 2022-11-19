import clsx from "clsx";
import style from "./Chapter.module.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faSave } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
const Chapter = () => {
  const indexChapter =
    window.location.pathname === "/chapter"
      ? 0
      : Number(window.location.pathname.replace("/Chapter", "")) - 1;

  const [isEdit, setIsEdit] = useState(false);
  const [titleEdit, setTitleEdit] = useState(() => {
    return !!localStorage.getItem("chapter")
      ? JSON.parse(localStorage.getItem("chapter"))[indexChapter].title
      : "";
  });
  const [contentEdit, setContentEdit] = useState(() => {
    return !!localStorage.getItem("chapter")
      ? JSON.parse(localStorage.getItem("chapter"))[indexChapter].content
      : "";
  });

  useEffect(() => {
    setTitleEdit(() => {
      return !!localStorage.getItem("chapter")
        ? JSON.parse(localStorage.getItem("chapter"))[indexChapter].title
        : "";
    });
    setContentEdit(() => {
      return !!localStorage.getItem("chapter")
        ? JSON.parse(localStorage.getItem("chapter"))[indexChapter].content
        : "";
    });
  }, [isEdit, indexChapter]);

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleSave = () => {
    //thay doi giao dien
    setIsEdit(false);

    //thay doi du lieu trong storage
    const storage = JSON.parse(localStorage.getItem("chapter"));
    storage[indexChapter].title = titleEdit;
    storage[indexChapter].content = contentEdit;
    localStorage.setItem("chapter", JSON.stringify(storage));
  };

  return (
    <div className={clsx(style.wrapper)}>
      {!!localStorage.getItem("chapter") ? (
        <div className={clsx(style.header)}>
          {JSON.parse(localStorage.getItem("chapter")).map((x, index) => {
            return (
              <Link
                to={`/Chapter${index + 1}`}
                key={index}
                className={clsx(style.item)}
              >
                {`Chapter${index + 1}`}
              </Link>
            );
          })}
        </div>
      ) : (
        <div>
          <p className={clsx(style.titleHeader)}>
            Bạn hiện chưa viết tự truyện cho bản thân
          </p>
          <img
            style={{ width: "100%", height: "500px", padding: "0 150px" }}
            alt="Ảnh bìa"
            src="https://i.pinimg.com/564x/df/98/ba/df98baf627d3ad9afae03772e8b86fa2.jpg"
          />
          <p className={clsx(style.titleHeader)}>
            Hãy viết tự truyện cho bản thân
          </p>
        </div>
      )}

      {!!localStorage.getItem("chapter") &&
        window.location.pathname === "/chapter" && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              style={{ width: "50%" }}
              src="https://i.pinimg.com/564x/f4/b7/c4/f4b7c400df26e82d5875d1eab968cb7a.jpg"
              alt="Anh jisoo"
            />
          </div>
        )}

      {!!localStorage.getItem("chapter") &&
      window.location.pathname !== "/chapter" ? (
        !isEdit ? (
          <div className={clsx(style.itemContent)}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h1 className={clsx(style.title)}>{titleEdit}</h1>
              <div style={{ display: "flex" }}>
                <div onClick={handleEdit} className={clsx(style.btn)}>
                  <FontAwesomeIcon icon={faPenToSquare} />
                </div>
              </div>
            </div>
            <p className={clsx(style.content)}>{contentEdit}</p>
          </div>
        ) : (
          <div className={clsx(style.itemContent)}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <input
                value={titleEdit}
                onChange={(e) => setTitleEdit(e.target.value)}
                spellCheck="false"
              />
              <div style={{ display: "flex" }}>
                <div onClick={handleSave} className={clsx(style.btn)}>
                  <FontAwesomeIcon icon={faSave} />
                </div>
              </div>
            </div>
            <textarea
              value={contentEdit}
              onChange={(e) => setContentEdit(e.target.value)}
              spellCheck="false"
            ></textarea>
          </div>
        )
      ) : (
        <></>
      )}
    </div>
  );
};

export default Chapter;
