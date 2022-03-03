import './App.css';
import { useState } from 'react';

function Lista() {
    const opiskelijat = [
        { etunimi: 'Maija', sukunimi: 'Mehiläinen', aloitusvuosi: 2020 },
        { etunimi: 'Matti', sukunimi: 'Meikäläinen', aloitusvuosi: 2019 },
        { etunimi: 'Mikko', sukunimi: 'Muukalainen', aloitusvuosi: 2020 },
        { etunimi: 'Martta', sukunimi: 'Maatiainen', aloitusvuosi: 2021 }
    ];

    return (
        <div>
            <h2>Lista</h2>
            <ul>
                {opiskelijat.map((op) => <Rivi etunimi={op.etunimi} sukunimi={op.sukunimi} aloitusvuosi={op.aloitusvuosi} />)}
            </ul>
        </div>
    );
}

const Rivi = (props) => {
    return (
        <li>{props.etunimi}, {props.sukunimi}, {props.aloitusvuosi}</li>
    );
}

function Teht6() {
    const [nayta, setNayta] = useState(true);

    const otsikko = [
        { n: 'Nimi', o: 'Osoite', a: 'Aloitusvuosi' }
    ];

    const otsikko_eng = [
        { n: 'Name', o: 'Address', a: 'Starting year' }
    ]
    const data = [
        { nimi: 'Aku', osoite: 'Tie 13', aloitusvuosi: 2022 },
        { nimi: 'Roope', osoite: 'Osoitetie 33', aloitusvuosi: 2020 },
        { nimi: 'Iines', osoite: 'Tiekuja 4', aloitusvuosi: 2021 },
        { nimi: 'Hupu', osoite: 'Kujatie 6', aloitusvuosi: 2019 },
        { nimi: 'Lupu', osoite: 'Osoitekuja 99', aloitusvuosi: 2020 }
    ];
    
    return (
        <div>
            <button onClick={() => setNayta(!nayta)}>Piilota</button>
            { nayta
                ? <div><Taulukko otsikko={otsikko} data={data} />
                <Taulukko otsikko={otsikko_eng} data={data} /> </div>
                :null
            }
        </div>
    );
}

function Taulukko(props) {
    let o = props.otsikko || [];
    let d = props.data || [];
    return (
        <div>
            <table>
                <Otsikko otsikko={o} />
                <TauluRivi data={d} />
            </table>
        </div>
    );
}

const Otsikko = (props) => {
    const otsikko = props.otsikko.map((o) => {
        return (
            <tr>
                <th>{o.n}</th>
                <th>{o.o}</th>
                <th>{o.a}</th>
            </tr>
        )
    })
    return <thead>{otsikko}</thead>
}

const TauluRivi = (props) => {
    const rivi = props.data.map((o) => {
        return (
            <tr>
                <td>{o.nimi}</td>
                <td>{o.osoite}</td>
                <td>{o.aloitusvuosi}</td>
            </tr>
        )
    })
    return <tbody>{rivi}</tbody>
}

export {Lista, Rivi, Taulukko, Teht6, Otsikko, TauluRivi};