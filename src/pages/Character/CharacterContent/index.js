import { Fragment } from "react";
import clsx from "clsx";
import style from "./CharacterContent.module.scss";

const CharacterContent = () => {
  const content = JSON.parse(localStorage.getItem("characters")) ?? [];

  const indexPath = Number(window.location.pathname.replace("/characters", ""));

  return (
    <div className={clsx(style.wrapper)}>
      {content.map((x, index) => {
        if (index + 1 === indexPath) {
          return (
            <div key={index}>
              <div className={clsx(style.header)}>
                <img
                  className={clsx(style.img)}
                  src={x.linkImage}
                  alt="Avatar"
                />
                <div className={clsx(style.info)}>
                  <div className={clsx(style.nickname)}>{x.nickname}</div>
                  <div className={clsx(style.realname)}>
                    Tên thật : {x.title}
                  </div>
                  <div className={clsx(style.content)}>Mô tả : {x.content}</div>
                </div>
              </div>

              <div>
                <h1 className={clsx(style.headerTitle)}>Đặc điểm tính cách , nhận dạng họ</h1>
                <div style={{display:"flex",flexWrap:"wrap"}}>
                {x.personalities.map((y, i) => {
                return <p className={clsx(style.personalItems)} key={i}>#{y}</p>;
              })}
                </div>
              </div>

              <div>
              <h1 className={clsx(style.headerTitle)}>Dòng thời gian</h1>
              {x.timelapse.map((y, i) => {
                return (
                  <div className={clsx(style.wrapperTimelapse)} key={i}>
                    <h1 className={clsx(style.time)}>{y.time}</h1>
                    <h1 className={clsx(style.diary)}>{y.diary}</h1>
                  </div>
                );
              })}
              </div>
              
            </div>
          );
        } else {
          return <Fragment key={index}></Fragment>;
        }
      })}
      {!localStorage.getItem("characters") && (
        <div>
          <p
            style={{ fontSize: "30px", fontWeight: "600", textAlign: "center" }}
          >
            Bạn chưa có người bên cạnh
          </p>
          <img
            style={{ width: "100%", height: "500px", padding: "0 150px" }}
            alt="Ảnh bìa"
            src="https://i.pinimg.com/564x/70/1c/26/701c26d23e956bca641402e1977170be.jpg"
          />
          <p
            style={{ fontSize: "30px", fontWeight: "600", textAlign: "center" }}
          >
            Hãy điền thông tin một người nào đó mà bạn cho là cái vai trò quan
            trọng với bạn
          </p>
        </div>
      )}
    </div>
  );
};

export default CharacterContent;
