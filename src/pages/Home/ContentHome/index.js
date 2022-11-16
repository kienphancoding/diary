import { Fragment } from "react";
import clsx from "clsx";
import style from "./ContentHome.module.scss";

const ContentHome = ({ month , year }) => {
  const content = JSON.parse(localStorage.getItem("diary")) ?? [];

  return (
    <div>
      {content.map((x, index) => {
        if (Number(x.month) === month && Number(x.year) === year) {
          return (
            <div
              className={clsx(style.item)}
              key={index}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <div style={{ display: "flex" }}>
                <div>{x.date}</div>
                <div>{x.title}</div>
                <div>{x.mood}</div>
              </div>
              <div>{x.content}</div>
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
