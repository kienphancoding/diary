import { Link } from "react-router-dom";
import clsx from "clsx";
import style from "./NotFound.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackward,
  faHouse,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";

const NotFound = () => {
  return (
    <div>
      <h1 className={clsx(style.title)}>Không tìm thấy trang</h1>
      <p className={clsx(style.content)}>
        Nguyên nhân: Liên kết bị hỏng hoặc bạn đã xóa trang đó đi hoặc đang tạo.
      </p>
      <div className={clsx(style.wrapImage)}>
        <img
          className={clsx(style.img)}
          src="https://i.pinimg.com/564x/5d/82/ec/5d82ecdd32d5db2965d59ebbd7f67e84.jpg"
          alt="Anh jisoo"
        />
      </div>

      <div className={clsx(style.wrapMenu)}>
      <button
          className={clsx(style.btn)}
          onClick={() => window.history.back()}
        >
          <FontAwesomeIcon icon={faBackward} className={clsx(style.icon)} />
        </button>

        <Link className={clsx(style.btn)} to="/">
          <FontAwesomeIcon icon={faHouse} className={clsx(style.icon)} />
        </Link>

        <button
          className={clsx(style.btn)}
          onClick={() => window.location.reload()}
        >
          <FontAwesomeIcon icon={faRotateRight} className={clsx(style.icon)} />
        </button>
      </div>
    </div>
  );
};

export default NotFound;
