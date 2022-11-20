import clsx from "clsx";
import { useState, useEffect } from "react";
import style from "../Settings.module.scss";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPasswprd] = useState("");
  const [checkPassword, setCheckPassword] = useState("");

  const oldPasswordText = "Mật khẩu cũ";
  const newPasswordText = "Nhập mật khẩu mới";
  const checkPasswordText = "Nhập lại mật khẩu mới";

  const handleSubmit = () => {
    if (
      newPassword === checkPassword &&
      newPassword !== "" &&
      newPassword.length >= 7 &&
      newPassword !== oldPassword &&
      oldPassword === localStorage.getItem("password")
    ) {
      localStorage.setItem("password", newPassword);
      window.location.reload();
    }
  };

  //check old password
  useEffect(() => {
    const checkText = document.getElementsByClassName(clsx(style.check))[0];
    if (oldPassword === "") {
      checkText.textContent = "";
    } else if (oldPassword !== localStorage.getItem("password")) {
      checkText.style.color = "red";
      checkText.textContent = "Mật khẩu không đúng";
    } else {
      checkText.textContent = "Mật khẩu chính xác";
      checkText.style.color = "green";
    }
  }, [oldPassword]);

  useEffect(() => {
    if (!!localStorage.getItem("password")) {
      const checkText = document.getElementsByClassName(clsx(style.check))[1];
      if (
        newPassword === localStorage.getItem("password") &&
        newPassword === oldPassword
      ) {
        checkText.textContent = "Trùng mật khẩu cũ";
        checkText.style.color = "yellow";
      } else if (newPassword.length < 7 && newPassword !== "" && checkPassword !== "") {
        checkText.textContent = "Mật khẩu quá ngắn";
        checkText.style.color = "red";
      } else if(newPassword !== checkPassword && newPassword !== "" && checkPassword !== ""){
        checkText.textContent = "Mật khẩu ko khớp";
        checkText.style.color = "red";
      } else if (newPassword === checkPassword && newPassword !== "") {
        checkText.style.color = "green";
        checkText.textContent = "Mật khẩu đã khớp";
      }else{
        checkText.textContent = "";
      }
    }
  }, [newPassword, checkPassword, oldPassword]);
  return (
    <div className={clsx(style.form)}>
      <p className={clsx(style.title)}>{oldPasswordText}</p>
      <input
        className={clsx(style.input)}
        type="password"
        spellCheck="fale"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        placeholder={oldPasswordText}
      />
      <p className={clsx(style.check)}></p>
      <p className={clsx(style.title)}>{newPasswordText}</p>
      <input
        className={clsx(style.input)}
        type="password"
        spellCheck="fale"
        value={newPassword}
        onChange={(e) => setNewPasswprd(e.target.value)}
        placeholder={newPasswordText}
      />

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

export default ChangePassword;
