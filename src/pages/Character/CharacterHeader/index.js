import { Link } from "react-router-dom";
import clsx from "clsx";
import style from "./CharacterHeader.module.scss"

const CharacterHeader = () => {
    const content = JSON.parse(localStorage.getItem("characters")) ?? [];

    return (  
        <div className={clsx(style.wrapper)}>
            {content.map((x,index)=>{
                return(
                    <Link to={`/characters${index+1}`} key={index}>
                        <img src={x.linkImage} alt=""/>
                        <p>{x.nickname}</p>
                    </Link>
                )
            })}
        </div>
    );
}
 
export default CharacterHeader;