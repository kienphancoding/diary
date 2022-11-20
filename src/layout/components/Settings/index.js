import clsx from "clsx";
import ChangePassword from "./ChangePassword";
// import { useState, useEffect } from "react";
import SettingPassword from "./SettingPassword";
import style from "./Settings.module.scss";
import useOnClickOutside from "../../../hooks/useOnClickOutside"
import { useRef } from "react";


const Settings = ({setShow}) => {
  const ref = useRef()

  useOnClickOutside(ref, () => setShow(false))

  return (
    <div ref={ref} className={clsx(style.wrapper)}>
      {/* Set assword */}
      {!localStorage.getItem("password") && <SettingPassword/>}

      {!!localStorage.getItem("password") && <ChangePassword/>}
    </div>
  );
};

export default Settings;
