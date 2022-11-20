import CharacterContent from "./CharacterContent";
import CharacterHeader from "./CharacterHeader";

const Character = () => {
    return ( 
        <div>
            <CharacterHeader />

            <CharacterContent/>

            {window.location.pathname==="/character" && !!localStorage.getItem("characters") && <div style={{display:"flex",justifyContent:"center"}}><img style={{width:"100%"}} src="https://i.pinimg.com/564x/81/0f/c8/810fc886115acc3079ecaec2152a47ed.jpg" alt="Anh jisoo"/></div>}
        </div>
     );
}
 
export default Character;