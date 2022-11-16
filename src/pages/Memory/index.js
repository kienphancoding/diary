import clsx from "clsx";
import style from "./Memory.module.scss";

const Memory = () => {
  return (
    <div className={clsx(style.wrapper)}>
      {!!localStorage.getItem("memories") &&
        JSON.parse(localStorage.getItem("memories")).map((x, index) => {
          return (
            <div key={index}>
              <h1>{x.title}</h1>
              <p>{x.content}</p>
            </div>
          );
        })}
      {!localStorage.getItem("memories") && <h1>Hay tao memories</h1>}
    </div>
  );
};

export default Memory;
