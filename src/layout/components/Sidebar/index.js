import clsx from "clsx";
import { Link } from "react-router-dom";
import style from "./Sidebar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faBookDead,
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

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const [content, setContent] = useState();
  const list = [
    { path: "/", name: "Trang chủ", icon: faHouse },
    { path: "/static", name: "Thong ke", icon: faChartColumn },
    { path: "/chapter", name: "Tu truyen", icon: faBook },
    { path: "/memory", name: "Ki niem", icon: faMemory },
    { path: "/character", name: "Nhan vat", icon: faPeopleArrows },
    {
      path: "/create",
      name: "Tao trang",
      icon: faSquarePlus,
      content: "create",
      component: Create,
    },
    {
      path: "/thisdaylastyear",
      name: "Ngày này năm ngoái",
      icon: faCalendar,
    },
    { path: "/momment", name: "Khoảnh khắc", icon: faStar },
    { path: "/galery", name: "Thư viện", icon: faImage },
    {
      path: "/setting",
      name: "Cai dat",
      icon: faGear,
      content: "settings",
      component: Settings,
    },
  ];

  return (
    <div className={clsx(style.wrapper)}>
      <Link to="/" className={clsx(style.link)}>
        <FontAwesomeIcon className={clsx(style.icon)} icon={faBookDead} />
      </Link>
      {list.map((x, index) => {
        return !x.content ? (
          <Link
            to={x.path}
            key={index}
            className={clsx(style.link)}
            data={x.name}
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
                <Element />
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
