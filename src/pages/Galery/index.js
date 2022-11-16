import { useState } from "react";

const Galery = () => {
    const [avatar,setAvatar] = useState()
    const [images,setImages] = useState([])

    const handleFile = (e) =>{
        const  file = e.target.files[0]
        file.preview = URL.createObjectURL(file)
        setAvatar(file)
        setImages((prev)=>[...prev,file.preview])
    }
    return ( 
        <div>
            <h1>Galery</h1>
            <h1>Dang phat trien</h1>
            <input type="file" onChange={handleFile}/>
            {avatar && <img src={avatar.preview} alt="" width="500px" maxHeight="300px"/>}

            <div>
                {images.map((x,index)=>{
                    return(
                        <img src={x} key={index} alt="" width="300px" height="400px"/>
                    )
                })}
            </div>
        </div>
     );
}
 
export default Galery;