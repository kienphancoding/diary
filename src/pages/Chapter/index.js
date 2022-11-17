import clsx from "clsx";
import style from "./Chapter.module.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

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
          <p style={{fontSize:"30px",fontWeight:"600",textAlign:"center"}}>Bạn hiện chưa viết tự truyện cho bản thân</p>
          <img style={{width:"100%",height:"500px",padding:"0 150px"}} alt="Ảnh bìa" src="https://i.pinimg.com/564x/df/98/ba/df98baf627d3ad9afae03772e8b86fa2.jpg"/>
          <p style={{fontSize:"30px",fontWeight:"600",textAlign:"center"}}>Hãy viết tự truyện cho bản thân</p>
        </div>
      )}

      {!!localStorage.getItem("chapter") ? (
        <div style={{padding:"20px 30px",margin:"10px 30px",boxShadow: "rgba(45, 35, 66, 0.4) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #d6d6e7 0 -3px 0 inset"}}>
          <div style={{display:"flex",justifyContent:"space-between"}}>
          <h1 className={clsx(style.title)}>{title}</h1>
          <div style={{display:"flex"}}>
            <div className={clsx(style.btn)}><FontAwesomeIcon icon={faPenToSquare}/></div>
          </div>
          </div>
          <p className={clsx(style.content)}>{content}</p>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Chapter;
