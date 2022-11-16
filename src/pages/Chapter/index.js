import clsx from "clsx";
import style from "./Chapter.module.scss";
import { Link } from "react-router-dom";

const Chapter = () => {
  const indexChapter = window.location.pathname==="/chapter"?0: Number(window.location.pathname[window.location.pathname.length - 1]) - 1
  const title = !!localStorage.getItem("chapter")? JSON.parse(localStorage.getItem("chapter"))[indexChapter].title : ""
  const content = !!localStorage.getItem("chapter")? JSON.parse(localStorage.getItem("chapter"))[indexChapter].content : ""
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
          <h1>HAY CHuongư truyện cho bạn</h1>
        </div>
      )}

      {!!localStorage.getItem("chapter") ? (
        <div>
          <h1>{title}</h1>
          <p>{content}</p>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Chapter;
