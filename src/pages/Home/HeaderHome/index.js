import { Link } from "react-router-dom";
import clsx from "clsx";
import style from "./HeaderHome.module.scss";

const HeaderHome = () => {
  const content = JSON.parse(localStorage.getItem("diary"))??[{month:new Date().getMonth()+1,year:new Date().getFullYear()}];

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
          <p className={clsx(style.title)}>Bạn hiện chưa có nhật kí nào</p>
          <img className={clsx(style.img)} alt="Ảnh bìa" src="https://i.pinimg.com/564x/3c/2d/2e/3c2d2e65ecbc0604957e94c1f2c3a3d1.jpg"/>
          <p className={clsx(style.title)}>Hãy tạo nhật kí ngày hôm nay</p>
        </div>
      )}
    </div>
  );
};

export default HeaderHome;
