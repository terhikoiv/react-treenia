import './App.css';
import {useState} from 'react';


function Laskuri(){
    const [arvo, setArvo] = useState(0);

    const kasvata = () => {
        setArvo(arvo+1);
    }
    const nollaa = () => {
        setArvo(0);
        
    }

    return(
        <div>
            <button  onClick={() =>kasvata()} >Kasvata</button>
            <button onClick={() =>nollaa()}>Nollaa</button>
            <br></br>
            {
                // <h1 style={{color: arvo >10 ? 'red':'black'}}>Laskuri on {arvo}</h1>
            }
            <Arvo arvo={arvo}/>
        </div>
    );
}

const Arvo = (props) => {
    return(
        <h1 style={{color: props.arvo >10 ? 'red':'black', fontWeight:props.arvo >10 ? 'bold':'normal'}} >Laskuri on {props.arvo}</h1>
    );
}

export {Laskuri, Arvo};