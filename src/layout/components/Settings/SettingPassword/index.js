import clsx from "clsx";
import { useState, useEffect } from "react";
import style from "../Settings.module.scss";

const SettingPassword = () => {
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");

  const createPasswordText = "Tạo mật khẩu"
  const checkPasswordText = "Nhập lại mật khẩu"

  const target = [
    { length: 15, content: "Rất mạnh", color: "blue" },
    { length: 13, content: "Mạnh", color: "green" },
    { length: 10, content: "Ổn", color: "yellow" },
    { length: 7, content: "Trung bình", color: "orange" },
    { length: 5, content: "Yếu", color: "red" },
  ];

  const findTarget =
    target.find((x) => {
      return password.length > x.length;
    }) || target[target.length - 1];

  const handleSubmit = () => {
    if (password === checkPassword && password !== "" && password.length >= 7) {
      localStorage.setItem("password", password);
      window.location.reload();
    } else if (password.length < 7) {
      if (!localStorage.getItem("password")) {
        document.getElementsByClassName(clsx(style.check))[0].style.color =
          "red";
        document.getElementsByClassName(clsx(style.check))[0].textContent =
          "Mật khẩu quá ngắn";
      }
    } else {
      if (!localStorage.getItem("password")) {
        document.getElementsByClassName(clsx(style.check))[0].style.color =
          "red";
        document.getElementsByClassName(clsx(style.check))[0].textContent =
          "Mật khẩu không khớp";
      }
    }
  };

  //remove check password
  useEffect(() => {
    if (!localStorage.getItem("password")) {
      if (password === checkPassword && password !== "") {
        document.getElementsByClassName(clsx(style.check))[0].style.color =
          "green";
        document.getElementsByClassName(clsx(style.check))[0].textContent =
          "Mật khẩu đã khớp";
      } else if (
        document.getElementsByClassName(clsx(style.check))[0].textContent !== ""
      ) {
        document.getElementsByClassName(clsx(style.check))[0].textContent = "";
      }
    }
  }, [password, checkPassword]);

  return (
    <div className={clsx(style.form)}>
      <p className={clsx(style.title)}>{createPasswordText}</p>
      <input
        className={clsx(style.input)}
        type="password"
        spellCheck="fale"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder={createPasswordText}
      />
      {password.length > 0 && (
        <p className={clsx(style.target)} style={{ color: findTarget.color }}>
          {findTarget.content}
        </p>
      )}
      <p className={clsx(style.title)}>{checkPasswordText}</p>
      <input
        className={clsx(style.input)}
        type="password"
        spellCheck="fale"
        value={checkPassword}
        onChange={(e) => setCheckPassword(e.target.value)}
        placeholder={checkPasswordText}
        onKeyDown={(e)=>{
            if(e.key==="Enter"){
                handleSubmit()
            }
        }}
      />
      <p className={clsx(style.check)}></p>
      <button className={clsx(style.submit)} onClick={handleSubmit}>
        OK
      </button>
    </div>
  );
};

export default SettingPassword;
