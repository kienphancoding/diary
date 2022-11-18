import clsx from "clsx";
import { Link } from "react-router-dom";
import style from "./Sidebar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faCalendar,
  faChartColumn,
  faGear,
  faHouse,
  faImage,
  faMemory,
  faPeopleArrows,
  faSquarePlus,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Create from "../Create";
import Settings from "../Settings";
import Logo from "./logo192.png"

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const [content, setContent] = useState();
  const list = [
    { path: "/", name: "Trang chủ", icon: faHouse },
    { path: "/chapter", name: "Tự truyện", icon: faBook },
    { path: "/memory", name: "Kỉ niệm", icon: faMemory },
    { path: "/momment", name: "Khoảnh khắc", icon: faStar },
    { path: "/character", name: "Nhân vật", icon: faPeopleArrows },
    {
      path: "/create",
      name: "Viết nhật kí",
      icon: faSquarePlus,
      content: "create",
      component: Create,
    },
    { path: "/static", name: "Thống kê", icon: faChartColumn },
    {
      path: "/thisdaylastyear",
      name: "Ngày này năm trước",
      icon: faCalendar,
    },
    
    { path: "/galery", name: "Thư viện", icon: faImage },
    {
      path: "/setting",
      name: "Cài đặt",
      icon: faGear,
      content: "settings",
      component: Settings,
    },
  ];

  return (
    <div className={clsx(style.wrapper)}>
      <Link to="/" className={clsx(style.linkHome)}>
        <img width={40} src={Logo} style={{borderRadius:"100px"}} alt="logo" />
      </Link>
      {list.map((x, index) => {
        return !x.content ? (
          <Link
            to={x.path}
            key={index}
            className={clsx(style.link)}
            data={x.name}
            style={window.location.pathname===x.path?{backgroundColor:"black",color:"#fff"}:{}}
          >
            <FontAwesomeIcon className={clsx(style.icon)} icon={x.icon} />
          </Link>
        ) : (
          <div
            to={x.path}
            key={index}
            className={clsx(style.link)}
            data={x.name}
            onClick={() => {
              if(show===false){
                setShow(true)
                setContent(x.content)
              }else if(content===x.content){
                setShow(false)
              }else{
                setContent(x.content)
              }
            }}
          >
            <FontAwesomeIcon className={clsx(style.icon)} icon={x.icon} />
          </div>
        );
      })}
      <div>
        {list.map((x, index) => {
          let Element = x.component;
          return (
            show &&
            content === x.content && (
              <div key={index}>
                <Element setShow={setShow}/>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
