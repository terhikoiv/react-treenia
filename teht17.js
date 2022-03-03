import { useState, useEffect } from "react";

// 22 ei toimi, uuden asiakkaan lisääminen/ asiakkaan muokkaaminen ei toimi

const Asiakas = () => {
    //muuttujat haku kenttiin
    const [nimi, setNimi] = useState("");
    const [osoite, setOsoite] = useState("");
    const [tyyppi, setTyyppi] = useState("");
    //muuttujat taulun ja alasvetovalikon näyttämiseen
    const [asiakkaat, setAsiakkaat] = useState([]);
    const [astyypit, setAstyypit] = useState([]);
    //hakuehdoille muuttujat
    const [query, setQuery] = useState("");
    const [poistettava, setPoistettava] = useState("");
    
    const [loadingTeksti, setloadingTeksti] = useState(false);
    const [naytaFormi, setNaytaformi] = useState(false); //uuden asiakkaan lisäys formi

    //formin kentille state-muuttujat
    const [nimiEdit, setNimiedit] = useState("");
    const [osoiteEdit, setOsoiteedit] = useState("");
    const [puhelinEdit, setPuhelinedit] = useState("");
    const [astyEdit, setAstyedit] = useState("");

    const [laskuri, setLaskuri] = useState(0);
    const [laskuri2, setLaskuri2] = useState(0);
    const [laskuri3, setLaskuri3] = useState(0);

    const [naytaHaku, setNaytahaku] = useState(true);
    const [muokkausFormi, setMuokkausformi] = useState(false);

    const [haku, setHaku] = useState("");
    const [as, setAs] = useState([]);

    const [nimiMuok, setNimiMuok] = useState("");
    const [osoiteMuok, setOsoiteMuok] = useState("");
    const [puhMuok, setPuhMuok] = useState("");
    const [astyMuok, setAstyMuok] = useState("");
 
    const [naytaTaulu, setNaytataulu] = useState(false);

   
    // kun useEffecin lopussa on [] tyhjät hakasulut silloin
    // tämä haetaan VAIN KERRRAN !!
    useEffect(() => {
        const haeTyypit = async () => {
            let vastaus = await fetch("http://localhost:3004/asiakastyyppi");
            let d = await vastaus.json();
            setAstyypit(d);
        }
        haeTyypit();
    }, []);

    useEffect( () =>{
        const asiakasHaku = async () => {
            let vastaus = await fetch("http://localhost:3004/asiakas?id="+ haku);
            let c =  await vastaus.json();
            setAs(c);
        }
        if(laskuri3 > 0) asiakasHaku();
    }, [laskuri3])

    //loading teksti!!
    let teksti = null;
    if(loadingTeksti) teksti = <p data-testid="loading">Loading...</p>;

    // tällä haetaan rajapinnasta
    useEffect( () => {
        const haeAsiakas = async () => { 
            setloadingTeksti(true);
            let vastaus = await fetch("http://localhost:3004"+ query);
            let c =  await vastaus.json();
            setloadingTeksti(false);
            setAsiakkaat(c);
            setNaytataulu(true)
        }
        if( query != "") haeAsiakas();
    }, [query]);

    
    //tällä poistetaan rajapinnasta
    useEffect( ()=> {
        const poistaAsiakas = async () => {
            await fetch("http://localhost:3004/asiakas/"+poistettava ,{method: 'DELETE'})
            .then(() =>{
                fetch("http://localhost:3004/asiakas?" +query)
                .then(response => response.json())
                .then(result =>{
                    setAsiakkaat(result);
                });
            });
        }
        if( poistettava != "") poistaAsiakas();
    }, [poistettava])

    //lisätään uusi asiakas
    useEffect( () => {
        const lisaaAsiakas = async () => {
            if(nimiEdit !== "" && osoiteEdit !== "" && puhelinEdit !== "" && astyEdit !== ""){
                let p ={
                    nimi: nimiEdit,
                    osoite: osoiteEdit,
                    puhelinnro: puhelinEdit,
                    tyyppi_id: astyEdit
                };
                await fetch("http://localhost:3004/asiakas", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(p)
                })
                .then(() => {
                    fetch("http://localhost:3004/asiakas?" +query)
                    .then(response => response.json())
                    .then(result => {
                        setAsiakkaat(result);
                    })
                })
            }
        }
        if(laskuri > 0) lisaaAsiakas(); //jos laskuri on yli nollan niin silloin kutsutaan metodia 
    }, [laskuri])                       // -> laskuri muuttuu kun painettu tallenna nappia

    //kun painettu muokkaa nappia - lähetetään päivitetyt tiedot
    useEffect( () => {
        const muokkaaAsiakas = async () => {
            console.log("muokkaa asiakasta on kutsuttu!!")
            if(nimiMuok !== "" || osoiteMuok !== "" || puhMuok !=="" || astyMuok !==""){
                let p ={
                    nimi: nimiMuok,
                    osoite: osoiteMuok,
                    puhelinnro: puhMuok,
                    tyyppi_id: astyMuok
                };
                console.log("lähetettävä data ",p)
                await fetch("http://localhost:3004/asiakas/"+haku , {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(p)
                })
                .then(() => {
                    fetch("http://localhost:3004/asiakas?" +query)
                    .then(response => response.json())
                    .then(result => {
                        setAsiakkaat(result);
                    })
                })
            }
        }
        if(laskuri2 > 0 ) muokkaaAsiakas();
    }, [laskuri2])


    //tätä kutsutaan kun nappia painetaan -> luetaan input kentän arvo
    // tallennetaan sen muuttujaan -> tehdään haku muuttuja, joka lisätään
    // query muuttujaan -> jota käytetään rajapinnan hakuehtona!!
    const handleFetch = () => {
        let m ="/asiakas?";
        if(nimi !== "" && osoite !=="" && tyyppi !==""){
            m += "nimi="+nimi +"&osoite="+osoite+"&tyyppi_id="+tyyppi;
        }
        else if(nimi !== ""){
            m += "nimi=" + nimi;
        } else if(osoite !== ""){
            m += "osoite="+osoite;
        }else if(tyyppi !== ""){
            m += "tyyppi_id="+tyyppi;
        } else{
            setQuery();
            
        }
        setQuery(m);
    }

    // kun painettu rivin "poista"-nappia 
    // parametrinä toimitetaan rivin id -> sen perusteella poistetaan rivi
    const poistaFetch = (i) => {
        if(i !== ""){
            setPoistettava(i);
        }
    }
    
    //kun painetaan uuden asiakkaan lisäysformin "tallenna"-nappia
    const uusiFetch = () =>{
        if(nimiEdit !== "" && osoiteEdit !== "" && puhelinEdit !== "" && astyEdit !== ""){
           setLaskuri(laskuri+1);
        }
        setNaytahaku(true);
        setNaytaformi(false);
    }

    //kun painetaan "muokkaa"-nappia
    const muokkaaFetch = (i) => {
        setMuokkausformi(true);
        setNaytahaku(false);
        setNaytataulu(false);
        setHaku(i);
        setLaskuri3(1);
    }

    const tallennaMuokkaus =() =>{
        setLaskuri2(laskuri+1);
        setMuokkausformi(false);
        setNaytahaku(true);
        setNaytataulu(true);
    }

    const peruutaMuokkaus = () =>{
        setNaytahaku(true);
        setNaytataulu(true);
        setNaytaformi(false);
    }
    
    //kun painetaan "lisää uusi asiakas"- nappia -> piilotetaan haku kenttä ja näytetään formi
    const lisaaUusiNappi = () =>{
        setNaytahaku(false);
        setNaytataulu(false);
        setNaytaformi(true);
    }

    //kun painetaan lisaa uusi asiakas-formin "peruuta"-nappia
    const peruutaNappi = () =>{
        setNaytahaku(true);
        setNaytataulu(true);
        setNaytaformi(false);
    }

    const taulu = asiakkaat.map((s,i) => {
        return (
                <tr key={i}>
                    <td>{s.id}</td>
                    <td>{s.nimi}</td>
                    <td>{s.osoite}</td>
                    <td>{s.postinumero}</td>
                    <td>{s.postitoimipaikka}</td>
                    <td>{s.puhelinnro}</td>
                    <td>{s.tyyppi_id}</td>
                    <td>{s.tyyppi_selite}</td>
                    <button data-testid="deleteButton" onClick={() => {if (window.confirm('Haluatko varmasti poistaa asiakkaan '+s.nimi+'?')) poistaFetch(s.id)}}>Poista {s.id}</button>
                    <button data-testid="editButton" onClick={() => muokkaaFetch(s.id)}>Muokkaa asiakasta {s.id}</button>
                </tr>
            )
    })
   
    //mapataan asiakastyypit vaihtoehdot select elementtiin
    const tyypit = astyypit.map((s,i) =>{
        return <option data-testid="customertypeOption" key={i} value={s.id}>{s.selite}</option>
    });
   
    //käytetään returnissa taulun tai tekstin näyttämiseen
    let pituus = taulu.length;
  

    return (
        <div>
            {
                naytaHaku ?
                <div>
                    <label>
                    Nimi
                    <input type="text" data-testid="nameInput" onChange={(e) => setNimi(e.target.value)}/>
                    </label>
                    <label>
                        Osoite
                        <input type="text" data-testid="addressInput" onChange={(e) => setOsoite(e.target.value)}/>
                    </label>
                    <label>
                        Asiakastyyppi
                        <select data-testid="customertypeSelect" onChange={(e) => setTyyppi(e.target.value)}>
                            <option></option>
                            {tyypit}
                        </select>
                    </label>
                    <button data-testid="searchButton" onClick={() => handleFetch()}>Hae</button>
                    <button data-testid="addButton" onClick={() => lisaaUusiNappi()}>Lisää uusi</button>
                </div>
                : <div>
                </div>
            }
            
            {
                naytaFormi && (
                    <div>
                        <br></br>
                    <form>
                        <label>
                            nimi:
                            <input type="text" data-testid="nameEdit" value={nimiEdit} onChange={(e) => setNimiedit( e.target.value)}/>
                        </label>
                        <label>
                            osoite:
                            <input type="text" data-testid="addressEdit" value={osoiteEdit} onChange={(e) => setOsoiteedit(e.target.value)}/>
                        </label>
                        <label>
                            puhelin:
                            <input type="text" data-testid="phoneEdit" value={puhelinEdit} onChange={(e) => setPuhelinedit(e.target.value)}/>
                        </label>
                        <label>
                            asiakastyyppi:
                            <select data-testid="customertypeSelectEdit" value={astyEdit} onChange={(e) => setAstyedit(e.target.value)}>
                                <option></option>
                                <option value={1}>henkiloasiakas</option>
                                <option value={2}>yritysasiakas</option>
                                <option value={3}>entinen asiakas</option>
                            </select>
                        </label>
                    </form>
                    <button data-testid="saveButton" onClick={() => uusiFetch()}>Tallenna</button>
                    <button data-testid="cancelButton" onClick={() => peruutaNappi()}>Peruuta</button>
                    </div>
                )
            }
            {
                muokkausFormi && (
                    <div>
                         <form><br></br>
                        <label>
                            nimi:
                            {
                                as && as.map((item) => <input type="text" data-testid="nameEdit" defaultValue={item.nimi} onChange={(e) => setNimiMuok(e.target.value)}/>)
                            }
                            
                        </label><br></br>
                        <label>
                            osoite:
                            {
                                as && as.map((item) =><input type="text" data-testid="addressEdit" defaultValue={item.osoite} onChange={(e) => setOsoiteMuok(e.target.value)}/>)
                            }
                        </label><br></br>
                        <label>
                            puhelin:
                            {
                                as && as.map((item)=><input type="text" data-testid="phoneEdit" defaultValue={item.puhelinnro} onChange={(e) => setPuhMuok(e.target.value)}/> )
                            }
                            
                        </label><br></br>
                        <label>
                            asiakastyyppi:
                            {
                                as && as.map((item) =>
                                <select data-testid="customertypeSelectEdit" defaultValue={item.tyyppi_id} onChange={(e) => setAstyMuok(e.target.value)}>
                                    <option></option>
                                    <option value={1}>henkiloasiakas</option>
                                    <option value={2}>yritysasiakas</option>
                                    <option value={3}>entinen asiakas</option>
                                </select> )
                            }
                            
                        </label>
                        </form>
                    <button data-testid="saveEditButton" onClick={() => tallennaMuokkaus()}>Tallenna</button>
                    <button data-testid="cancelEditButton" onClick={() => peruutaMuokkaus()}>Peruuta</button>
                    </div>
                )
            }
            {teksti}
            {
                pituus >0 && naytaTaulu?
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nimi</th>
                            <th>Osoite</th>
                            <th>Postinumero</th>
                            <th>Postitoimipaikka</th>
                            <th>Puhelinnumero</th>
                            <th>Tyyppi_id</th>
                            <th>Tyyppi_selite</th>
                        </tr>
                    </thead>
                    <tbody>
                    {taulu}</tbody>
                </table>
                :  <p data-testid="notFound">Annetuilla hakuehdoilla ei löytynyt dataa</p>
            }

        </div>
    )
}

export {
    Asiakas
}