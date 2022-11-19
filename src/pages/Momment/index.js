import clsx from "clsx";
import style from "./Momment.module.scss";
import {
  faTrash,
  faPenToSquare,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { Input_Max_Length } from "../../layout/components/Create/CreateDiary";

const Momment = () => {
  const [item, setItem] = useState(() => {
    return JSON.parse(localStorage.getItem("mommnent")) ?? [];
  });

  const [isEdit, setIsEdit] = useState(false);
  const [indexItem, setIndexItem] = useState(0);
  const [titleEdit, setTitleEdit] = useState();
  const [contentEdit, setContentEdit] = useState();

  useEffect(() => {
    setItem(() => {
      return JSON.parse(localStorage.getItem("momment")) ?? [];
    });
  }, [isEdit]);

  const handleDelete = (index) => {
    //cắt chuỗi
    const storage = JSON.parse(localStorage.getItem("momment"));
    const a1 = storage.slice(0, index);
    const a2 = storage.slice(index + 1, storage.length);
    const new_arr = a1.concat(a2);
    //update giao diện
    setItem(new_arr);
    //lưu vào storage
    const storageJson = JSON.stringify(new_arr);
    localStorage.setItem("momment", storageJson);
    //nếu xóa phần tử thì gỡ luôn item vì nếu không sẽ ra mảng rỗng và sẽ bị lỗi
    if (item.length === 1) {
      localStorage.removeItem("momment");
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
      const storage = JSON.parse(localStorage.getItem("momment")) ?? [];
      storage[index].title = titleEdit;
      storage[index].content = contentEdit;
      localStorage.setItem("momment", JSON.stringify(storage));
    }
  };

  return (
    <div className={clsx(style.wrapper)}>
      {!!localStorage.getItem("momment") && (
        <h1 className={clsx(style.titleHeader)}>
          Khoảnh khắc đáng nhớ nhất đời tôi
        </h1>
      )}

      {!!localStorage.getItem("momment") &&
        item.map((x, index) => {
          return isEdit && indexItem === index ? (
            <div key={index} className={clsx(style.item)}>
              <div className={clsx(style.header)}>
                <input
                  className={clsx(style.input)}
                  value={titleEdit}
                  onChange={(e) => setTitleEdit(e.target.value)}
                  spellCheck="false"
                />
                <div className={clsx(style.menu)}>
                  {/* Nút save */}
                  <div
                    onClick={() => handleSave(index)}
                    className={clsx(style.btn)}
                  >
                    <FontAwesomeIcon icon={faSave} />
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
            <div key={index} className={clsx(style.item)}>
              <div className={clsx(style.header)}>
                <h1 className={clsx(style.title)}>{x.title}</h1>
                <div className={clsx(style.menu)}>
                  {/* Nút edit */}
                  <div
                    onClick={() => handleEdit(index, x.title, x.content)}
                    className={clsx(style.btn)}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </div>

                  {/* Nút delete  */}
                  <div
                    onClick={() => {
                      handleDelete(index);
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

      {/* Khi khong co noi dung nao */}
      {!localStorage.getItem("momment") && (
        <div>
          <p className={clsx(style.text)}>Bạn chưa tạo khoảnh khắc nào</p>
          <img
            className={clsx(style.img)}
            alt="Ảnh bìa"
            src="https://i.pinimg.com/564x/64/17/91/641791a133f4a206c0249123046927a8.jpg"
          />
          <p className={clsx(style.text)}>
            Hãy tạo khoảnh khắc bạn cảm thấy vui hoặc buồn nhất trong đời
          </p>
        </div>
      )}
    </div>
  );
};

export default Momment;
