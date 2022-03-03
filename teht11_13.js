import {useState} from 'react';
import './App.css';

const ListForm = () => {
    const [etunimi,setEtunimi] = useState('');
    const [osoite, setOsoite] = useState('');
    const [syntymavuosi, setSyntymavuosi] = useState('');
    const [tarkistus, setTarkistus] =useState(false); //tarkistukseen onko input yli 4 merkkiä
    const [tarkistus2, setTarkistus2] =useState(false);
    const [kentta, setKentta] = useState(""); //kenttien nimet
    const [lista, setLista] = useState([]);

    const lisaaNappi = () => { //for filter löytyykö javascrip array filter
        const onkoNimi = lista.filter(t => t.etunimi === etunimi);
        //console.log("onko nimi",onkoNimi);
        if(onkoNimi.length === 1){
            setTarkistus2(true);
        }else if(etunimi.length <4 && osoite.length < 4 && syntymavuosi.length < 4 ){
            setTarkistus(true);
            setKentta('nimi,osoite,vuosi');
        } else if(etunimi.length <4 && osoite.length < 4 ){
            setTarkistus(true);
            setKentta('nimi,osoite');
        }else if(osoite.length <4 && syntymavuosi.length < 4 ){
            setTarkistus(true);
            setKentta('osoite,vuosi');
        }
        else if(etunimi.length < 4 ){
            setTarkistus(true);
            setKentta('nimi');
        } else if(osoite.length < 4){
            setTarkistus(true);
            setKentta('osoite');
        } else if(syntymavuosi.length < 4){
            setTarkistus(true);
            setKentta('vuosi');
        }  else{
            setTarkistus(false);
            setTarkistus2(false);
            setLista([...lista, {etunimi:etunimi, osoite:osoite, syntymavuosi:syntymavuosi}]);
            setEtunimi("");
            setOsoite("");
            setSyntymavuosi("");
        }
    }

    let virhe = "";
    let nimivirhe = "nimi"
    let osoitevirhe = "osoite"
    let vuosivirhe = "vuosi"
    if(tarkistus) virhe = <Error nimi={kentta} />

    let virhe2 = "";
    let viesti = "Nimi "+etunimi+" on jo syötetty"
    
    if(tarkistus2)  virhe2 = <ErrorMessage message={viesti}/>

    console.log(lista);
    return(
        <div className='formi'>
            <form>
                <label>
                    Nimi: 
                    <input 
                    type='text' 
                    name='etunimi' 
                    onChange={(e) =>setEtunimi(e.target.value)} 
                    value={etunimi}/>
                </label><br></br>
                <label>
                    Osoite: 
                    <input 
                    type='text' 
                    name='osoite' 
                    onChange={(e) =>setOsoite(e.target.value)} 
                    value={osoite}/>
                </label><br></br>
                <label>
                    Syntymävuosi: 
                    <input 
                    type='text' 
                    name='syntymavuosi' 
                    onChange={(e) =>setSyntymavuosi(e.target.value)} 
                    value={syntymavuosi}/>
                </label><br></br>
            </form>
            <button onClick={(e) =>lisaaNappi(e)}>Add</button>
            {virhe}
            {virhe2}
            
            <Lista data={lista}/>
        </div>
    )
}
function Lista(props){
    const lista = props.data.map((n, index) =>{
        return <li key={index}>{n.etunimi},{n.osoite},{n.syntymavuosi}</li>
    })
    return(
        <div>
            <ul>{lista}</ul>
        </div>
    )
}

function Error(props){
    let error = <p>Virheelliset kentät: {props.nimi}  </p>
    return (
        <div>
            {error}
        </div>
    )
}

function ErrorMessage(props){
    let message = <p style={{color: 'red'}}>{props.message}</p>
    return (
        <div>
            {message}
        </div>
    )
}

export {
    ListForm,
    Lista,
    Error,
    ErrorMessage
}