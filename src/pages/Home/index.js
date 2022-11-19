import clsx from "clsx";
import style from "./Home.module.scss";

import ContentHome from "./ContentHome";
import HeaderHome from "./HeaderHome";

const Home = () => {
  const path = window.location.pathname;

  const noPath = path.split("/").join("");

  let month = () => {
    if (noPath.length === 6) {
      return Number(noPath.substring(0, 2));
    } else {
      return Number(noPath.substring(0, 1));
    }
  };

  let year = () => {
    if (noPath.length === 6) {
      return Number(noPath.substring(2, 6));
    } else {
      return Number(noPath.substring(1, 5));
    }
  };
  return (
    <div className={clsx(style.wrapper)}>
      <HeaderHome />

      <ContentHome month={month()} year={year()} />

      {window.location.pathname==="/"&& <div className={clsx(style.img)}><img  src="https://i.pinimg.com/564x/a8/b0/06/a8b006f82cd425b4751e696b87e5db91.jpg" alt="Anh nen"/></div>}
    </div>
  );
};

export default Home;
