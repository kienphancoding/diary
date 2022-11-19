import clsx from "clsx";
import { Fragment } from "react";
import style from "./ThisDayLastYear.module.scss";

const ThisDayLastYear = () => {
  const storage = JSON.parse(localStorage.getItem("diary")) ?? [
    { date: 0, month: 0, year: 0 },
  ];

  const currDate = new Date();

  const isExist = storage.some((x) => {
    return (
      x.date === currDate.getDate() &&
      x.month === currDate.getMonth() + 1 &&
      x.year === currDate.getFullYear() - 1
    );
  });

  return (
    <div>
      {/* Khi khong co Noi dung */}
      {!isExist && (
        <div>
          <h1 className={clsx(style.header)}>
            Ngày này năm ngoái bạn không có viết nhật kí nào cả
          </h1>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              style={{ width: "50%" }}
              src="https://i.pinimg.com/564x/bb/c4/07/bbc407d7b0df04219df5d359877f1946.jpg"
              alt="Anh jisoo"
            />
          </div>
        </div>
      )}

      {/* Render ra noi dung  */}
      {isExist && (
        <>
          <h1 className={clsx(style.header)}>
            Cùng xem lại ngày này năm ngoái của bạn như thế nào?
          </h1>
          {storage.map((x, index) => {
            if (
              x.date === currDate.getDate() &&
              x.month === currDate.getMonth() + 1 &&
              x.year === currDate.getFullYear() - 1
            ) {
              return (
                <div key={index}>
                  <div className={clsx(style.item)}>
                    <div className={clsx(style.wrapHeader)}>
                      <div className={clsx(style.title)}>{x.title}</div>
                      <div className={clsx(style.mood)}>{x.mood}</div>
                    </div>
                    <div className={clsx(style.content)}>{x.content}</div>
                  </div>
                </div>
              );
            } else {
              return <Fragment key={index}></Fragment>;
            }
          })}
        </>
      )}
    </div>
  );
};

export default ThisDayLastYear;
