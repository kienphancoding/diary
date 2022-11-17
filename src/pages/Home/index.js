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
    </div>
  );
};

export default Home;
