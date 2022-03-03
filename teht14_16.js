import {useState} from 'react';

const Professional = () => {
    const ammatit = [
        {koodi:123, selite:'maalari'}, 
        {koodi:233, selite:'koodari'}, 
        {koodi:344, selite:'palomies'}
    ]
  /*  const a = ammatit.map((k) =>{
        return <option key={k.koodi}>{k.selite}</option>
    })*/
    return (
        <Teht14 ammatit={ammatit}/>
    )
}

const Teht14 = (props) => {
    const [input, setInput] = useState("");
    const [valittu, setValittu] = useState("");
    const [nayta, setNayta] = useState(false);
    const [tutkinto, setTutkinto] = useState("");
    const [on, setOn] = useState("on tutkinto");
    const [ei, setEi] = useState("ei tutkintoa");

    const a = props.ammatit.map((k) =>{
        return <option value={k.koodi}>{k.selite}</option>
    })
    //const [koodi, setKoodi] = useState("police");

    return (
        <div>
            <label>
                Ammatti
                <select onChange={(e) =>setValittu(e.target.value)}>{a}</select>
            </label>
            <label>
                Nimi
                <input type="text" onChange={(e) =>setInput(e.target.value)} />
            </label>
            <label>
                Tutkinto suoritettu:
                <input type="checkbox" onChange={(e) =>setTutkinto(e.target.value)} value={ei}/>
                <label > ei tutkintoa</label>
                <input type="checkbox" onChange={(e) =>setTutkinto(e.target.value)} value={on}/>
                <label > tutkinto suoritettu</label>
            </label>
            <button  onClick={() => setNayta(!nayta)} >Insert</button>
            { nayta
                ? <div><Taulu nimi={input} koodi={valittu} tutkinto_suoritettu={tutkinto}/>
                </div>
                :null
            }
        </div>
    )
}


const Taulu = (props) => { 
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Nimi</th>
                        <th>Ammatti</th>
                        <th>Tutkinto</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{props.nimi}</td>
                        <td>{props.koodi}</td>
                        <td>{props.tutkinto_suoritettu}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export {
    Professional,
    Teht14
}