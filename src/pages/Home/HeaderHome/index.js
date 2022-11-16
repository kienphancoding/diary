import { Link } from "react-router-dom";
import clsx from "clsx";
import style from "./HeaderHome.module.scss";

const HeaderHome = () => {
  const content = JSON.parse(localStorage.getItem("diary")) ?? [];

  let headerItems = () => {
    let headerArray = [
      {
        month: content[0].month ?? [],
        year: content[0].year ?? [],
      },
    ];
    for (let i = 1; i < content.length; i++) {
      if (content[i].month !== headerArray[headerArray.length - 1].month) {
        headerArray = [
          ...headerArray,
          {
            month: content[i].month ?? [],
            year: content[i].year ?? [],
          },
        ];
      }
    }
    return headerArray;
  };
  return (
    <div>
      {!!localStorage.getItem("diary") ? (
        <div className={clsx(style.header)}>
          {headerItems().map((x, index) => {
            return (
              <Link
                to={`/${x.month}/${x.year}`}
                key={index}
                className={clsx(style.item)}
              >
                <div>{x.month}/</div>
                <div>{x.year}</div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div>
          <h1>HAY TAONHAT KI</h1>
        </div>
      )}
    </div>
  );
};

export default HeaderHome;
