import clsx from "clsx";
import style from "./Momment.module.scss";

const Momment = () => {
    return (  
        <div className={clsx(style.wrapper)}>
      {!!localStorage.getItem("momment") &&
        JSON.parse(localStorage.getItem("momment")).map((x, index) => {
          return (
            <div key={index}>
              <h1>{x.title}</h1>
              <p>{x.content}</p>
            </div>
          );
        })}
      {!localStorage.getItem("momment") && <h1>Hay tao momment</h1>}
    </div>
    );
}
 
export default Momment;