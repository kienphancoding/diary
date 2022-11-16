import clsx from "clsx";
import style from "./Chapter.module.scss";
import { Link } from "react-router-dom";

const Chapter = () => {
  return (
    <div className={clsx(style.wrapper)}>
      {!!localStorage.getItem("chapter") ? (
        <div className={clsx(style.header)}>
          {JSON.parse(localStorage.getItem("chapter")).map((x, index) => {
            return (
              <Link
                to={`/Chapter${index+1}`}
                key={index}
                className={clsx(style.item)}
              >
                {`Chapter${index+1}`}
              </Link>
            );
          })}
        </div>
      ) : (
        <div>
          <h1>HAY CHuongư truyện cho bạn</h1>
        </div>
      )}
    </div>
  );
};

export default Chapter;
