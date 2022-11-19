import clsx from "clsx"
import style from "./Trophy.module.scss"

const Trophy = () => {

    const lengthDiary = !!localStorage.getItem("diary") ? JSON.parse(localStorage.getItem("diary")).length : 0

    const target =[10,25,50,75,100,150,200,250,500,750,1000]

    return ( 
        <div className={clsx(style.wrapper)}>
            <div className={clsx(style.title)}>{lengthDiary} nhật kí</div>
            <div className={clsx(style.list)}>
                {target.map((x,index)=>{
                    return(
                        <div key={index} className={clsx(style.item)} style={lengthDiary>=x?{backgroundColor:"black",color:"white"}:{}}>{x}</div>
                    )
                })}
            </div>
        </div>
     );
}
 
export default Trophy;