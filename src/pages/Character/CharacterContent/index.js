import { Fragment } from "react";

const CharacterContent = () => {
  const content = JSON.parse(localStorage.getItem("characters")) ?? [];

  const indexPath = Number(window.location.pathname.replace("/characters",""))

    return (  
        <div>
      {content.map((x, index) => {
        if(index + 1 === indexPath){
            return(
                <div key={index}>
                    <img src={x.linkImage} alt={x.nickname}/>
                    <div>{x.title}</div>
                    <div>{x.nickname}</div>
                    <div>{x.content}</div>
                    {x.personalities.map((y,i)=>{
                        return(
                            <p key={i}>{y}</p>
                        )
                    })}
                    {x.timelapse.map((y,i)=>{
                        return(
                            <div key={i}>
                                <h1>{y.time}</h1>
                                <h1>{y.diary}</h1>
                            </div>
                        )
                    })}
                </div>
            )
        }else{
            return <Fragment key={index}></Fragment>
        }
      })}
    </div>
    );
}
 
export default CharacterContent;