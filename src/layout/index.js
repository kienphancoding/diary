import Sidebar from "./components/Sidebar";
import clsx from "clsx";
import style from "./Layout.module.scss";
import Password from "./components/Password";
import { useState } from "react";

const Layout = ({ children }) => {
  const [showPassword, setShowPassword] = useState(
    !!localStorage.getItem("password")
  );
  return (
    <>
      {showPassword && <Password setShowPassword={setShowPassword}/>}
      {
        !showPassword &&
        <div className={clsx(style.container)}>
          <Sidebar />
          <div className={clsx(style.content)}>{children}</div>
        </div>
      }
    </>
  );
};

export default Layout;
