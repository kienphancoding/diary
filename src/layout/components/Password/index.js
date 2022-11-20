import clsx from "clsx";
import { useState, useEffect } from "react";
import style from "./Password.module.scss";

const Password = ({ setShowPassword }) => {
  const [password, setPassword] = useState("");
  const [hint, setHint] = useState(false);

  const textPassword = "Nhập mật khẩu";

  useEffect(() => {
    if (password === localStorage.getItem("password")) {
      setShowPassword(false);
    }
  }, [password]);

  const handleHint = () => {
    let hint = "";
    for (let i = 0; i < localStorage.getItem("password").length; i++) {
      if (i % 3 == 0) {
        hint += localStorage.getItem("password")[i];
      } else {
        hint += "*";
      }
    }

    return hint;
  };

  return (
    <div className={clsx(style.password)} onContextMenu={(e)=>{e.preventDefault()}}>
      <div className={clsx(style.form)}>
        <p className={clsx(style.title)}>{textPassword}</p>
        <input
          type="password"
          className={clsx(style.input)}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={textPassword}
        />
        {!hint && (
          <p className={clsx(style.forget)} onClick={() => setHint(true)}>
            Quên mật khẩu ?
          </p>
        )}

        {hint && <p className={clsx(style.hint)}>Hint: {handleHint()} </p>}
      </div>
    </div>
  );
};

export default Password;
