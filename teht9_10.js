import {useState} from 'react';
import React from "react";

const Cars = () => {
    const [autot, setAutot] = useState([]);
    const [auto, setAuto] = useState('');

    const lisaaNappi = () => {
        setAutot([...autot, auto]);
        setAuto("");
    }

    return (
        <div>
            <input type='text' onChange={(e) =>setAuto(e.target.value)} value={auto}></input>
            <button onClick={(e) =>lisaaNappi(e) } >Save</button>
            <Lista data={autot}/>
        </div>
    );
}

function Lista(props){
    const lista = props.data.map((n, index) =>{
        return <li key={index}>{n}</li>
    })
    return(
        <div>
        <ul>{lista}</ul>
        <Info count={lista.length} />
        </div>
    )
}

function Info(props){
    const [pituus, setPituus] = useState(props.count);

    React.useEffect(() => {
        setPituus(props.count);
    }, [props.count]);
 
    
    return(
        <div>
           {
                pituus > 4 ? 
                <h2>Ainakin 5 nimeä on jo syötetty</h2> 
                : null
            }
        </div>
    ) 
}

export {
    Cars,
    Info
}