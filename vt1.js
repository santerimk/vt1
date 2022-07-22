"use strict";
//@ts-check 
// Joukkueen sarja on viite data.sarjat-taulukossa lueteltuihin sarjoihin
// Joukkueen rastileimausten rastit ovat viitteitä data.rastit-taulukossa lueteltuihin rasteihin

// Kirjoita tästä eteenpäin oma ohjelmakoodisi

/**
  * Taso 1
  * Järjestää leimaustavat aakkosjärjestykseen 
  * isoilla ja pienillä kirjaimilla ei ole järjestämisessä merkitystä
  * Alkuperäistä rakennetta ei muuteta vaan järjestäminen tehdään alkup. taulukon kopiolle.
  * @param {Object} data - tietorakenne, jonka data.rastit-taulukko järjestetään 
  * @return {Array} palauttaa järjestetyn _kopion_ data.leimaustavat-taulukosta
*/
function jarjestaLeimaustavat(data) {
    function compare(a, b) {
        let eka = a.toUpperCase();
        let toka = b.toUpperCase();
        if (eka < toka) {
            return -1;
        }
        if (eka > toka) {
            return 1;
        }
        return 0;
    }
    let leimaustavat = data.leimaustavat.slice();
    leimaustavat.sort(compare);
    return leimaustavat;
}

/**
  * Taso 1
  * Järjestää sarjat aakkosjärjestykseen sarjan nimen perustella 
  * isoilla ja pienillä kirjaimilla ei ole järjestämisessä merkitystä
  * Alkuperäistä rakennetta ei muuteta vaan järjestäminen tehdään alkup. taulukon kopiolle.
  * @param {Object} data - tietorakenne, jonka data.rastit-taulukko järjestetään 
  * @return {Array} palauttaa järjestetyn _kopion_ data.sarjat-taulukosta
  */
function jarjestaSarjat(data) {
    function compare(a, b) {
        let eka = a.nimi.toUpperCase();
        let toka = b.nimi.toUpperCase();
        if (eka < toka) {
            return -1;
        }
        if (eka > toka) {
            return 1;
        }
        return 0;
    }
    let sarjat = data.sarjat.slice();
    sarjat.sort(compare);
    return sarjat;
}


/**
  * Taso 1
  * Lisää uuden sarjan data-rakenteeseen ja palauttaa muuttuneen datan
  * Sarja lisätään vain jos kaikki seuraavat ehdot täyttyvät:
  *  - Toista samannimistä sarjaa ei ole olemassa. Nimien vertailussa
  *    ei huomioida isoja ja pieniä kirjaimia tai nimen alussa ja lopussa välilyöntejä etc. (whitespace)
  *    sarjan nimi ei voi olla pelkkää whitespacea. 
  * - Sarjan keston täytyy olla kokonaisluku ja suurempi kuin 0
  *  Uusi sarja tallennetaan data.sarjat-taulukkoon. Sarjan on oltava seuraavaa muotoa:
  *  {
  *     "id": {Number}, // Jokaisella sarjalle oleva uniikki kokonaislukutunniste, pakollinen tieto
  *     "nimi": {String}, // Sarjan uniikki nimi, pakollinen tieto
  *     "kesto": {Number}, // sarjan kesto tunteina, pakollinen tieto
  *     "alkuaika": {String}, // Sarjan alkuaika, oletuksena ""
  *     "loppuaika": {String}, // Sarjan loppuaika, oletuksena ""
  *  }
  * @param {Object} data - tietorakenne johon sarja lisätään 
  * @param {String} nimi - Lisättävän sarjan nimi
  * @param {String} kesto - Sarjan kesto
  * @param {String} alkuaika - Sarjan alkuaika, ei pakollinen
  * @param {String} loppuaika - Sarjan loppuaika, ei pakollinen
  * @return {Object} palauttaa muutetun alkuperäisen data-tietorakenteen
  */
function lisaaSarja(data, nimi, kesto, alkuaika, loppuaika) {
    let suurinId = 0;
    for (let sarja of data.sarjat) {
        if (sarja.id > suurinId) {
            suurinId = sarja.id;
        }
    }
    let uusiSarja = {
        id: suurinId+1,
        nimi: nimi,
        kesto: Number(kesto),
        alkuaika: "",
        loppuaika: "",
    };
    let laskuri = 0;
    for (let sarja of data.sarjat) {
        if (sarja.nimi.toUpperCase().trim() == nimi.toUpperCase().trim()) {
            laskuri++;
        }
    }
    if (laskuri == 0 && nimi.toUpperCase().trim().length > 0 && Number.isInteger(Number(kesto)) == true && kesto > 0) {
        data.sarjat.push(uusiSarja);
        console.log("Sarjan lisääminen onnistui");
        console.log(data.sarjat);
        return data;
    }
    console.log("Sarjan lisääminen epäonnistui");
    console.log(data.sarjat);
    return data;
}

/**
  * Taso 1
  * Poistaa joukkueen id:n perusteella data-rakenteesta ja palauttaa muuttuneen datan
  * @param {Object} data - tietorakenne josta joukkue poistetaan
  * @param {String} id - poistettavan joukkueen id
  * @return {Object} palauttaa muuttuneen alkuperäisen datan
  */
function poistaJoukkue(data, id) {
    for (let i = 0; i < data.joukkueet.length; i++) {
        if (data.joukkueet[i].id == id) {
            data.joukkueet.splice(i, 1);
        }
    }
    console.log("Joukkueen poistaminen onnistui");
    console.log(data);
    return data;
}

/**
  * Taso 3
  * Järjestää rastit aakkosjärjestykseen rastikoodin perustella siten, että 
  * numeroilla alkavat rastit ovat kirjaimilla alkavien jälkeen. Alkuperäistä 
  * rakennetta ei muuteta vaan järjestäminen tehdään alkup. taulukon kopiolle.
  * isoilla ja pienillä kirjaimilla ei ole järjestämisessä merkitystä
  * @param {Object} data - tietorakenne, jonka data.rastit-taulukko järjestetään 
  * @return {Array} palauttaa järjestetyn _kopion_ data.rastit-taulukosta
  */
function jarjestaRastit(data) {
    function compare(a, b) {
        let eka = a.koodi.toUpperCase();
        let toka = b.koodi.toUpperCase();
        if (eka < toka) {
            return -1;
        }
        if (eka > toka) {
            return 1;
        }
        return 0;
    }
    let rastit = data.rastit.slice();
    let numeroTaulukko = [];
    let kirjainTaulukko = [];
    for (let rasti of rastit) {
        if (rasti.koodi.substring(0, 1).match(/^[0-9]+$/) || rasti.koodi.substring(0, 2).match(/^[0-9]+$/)) {
            numeroTaulukko.push(rasti);
        } else {
            kirjainTaulukko.push(rasti);
        }
    }
    kirjainTaulukko.sort(compare);
    numeroTaulukko.sort(compare);
    let lopullinenTaulukko = kirjainTaulukko.concat(numeroTaulukko);
    return lopullinenTaulukko;
}

/**
  * Taso 3
  * Lisää joukkueen data-rakenteeseen ja palauttaa muuttuneen datan
  * Joukkue lisätään vain jos kaikki seuraavat ehdot täyttyvät:
  *  - Toista samannimistä joukkuetta ei ole olemassa. Nimien vertailussa
  *    ei huomioida isoja ja pieniä kirjaimia tai nimen alussa ja lopussa välilyöntejä etc. (whitespace)
  *    Joukkueen nimi ei voi olla pelkkää whitespacea. 
  *  - Leimaustapoja on annettava vähintään yksi kappale. Leimaustapojen
  *     on löydyttävä data.leimaustavat-taulukosta
  *  - Jäseniä on annettava vähintään kaksi kappaletta. 
  *  - Saman joukkueen jäsenillä ei saa olla kahta samaa nimeä
  *  - Sarjan id on löydyttävä data.sarjat-taulukon sarjoista
  *
  *  Uusi joukkue tallennetaan data.joukkueet-taulukkoon. Joukkueen on oltava seuraavaa muotoa:
  *  {
  *     "id": {Number}, // jokaisella joukkueella oleva uniikki kokonaislukutunniste
  *     "nimi": {String}, // Joukkueen uniikki nimi
  *     "jasenet": {Array}, // taulukko joukkueen jäsenien nimistä
  *     "leimaustapa": {Array}, // taulukko joukkueen leimaustapojen indekseistä (data.leimaustavat)
  *     "rastileimaukset": {Array}, // taulukko joukkueen rastileimauksista. Oletuksena tyhjä eli []
  *     "sarja": {Object}, // viite joukkueen sarjaan, joka löytyy data.sarjat-taulukosta
  *     "pisteet": {Number}, // joukkueen pistemäärä, oletuksena 0
  *     "matka": {Number}, // joukkueen kulkema matka, oletuksena 0
  *     "aika": {String}, // joukkueen käyttämä aika "h:min:s", oletuksena "00:00:00"
  *  }
  * @param {Object} data - tietorakenne johon joukkue lisätään 
  * @param {String} nimi - Lisättävän joukkueen nimi
  * @param {Array} leimaustavat - Taulukko leimaustavoista
  * @param {String} sarja - Joukkueen sarjan id-tunniste
  * @param {Array} jasenet - joukkueen jäsenet
  * @return {Object} palauttaa muutetun alkuperäisen data-tietorakenteen
  */
function lisaaJoukkue(data, nimi, leimaustavat, sarja, jasenet) {
    let suurinId = 0;
    for (let joukkue of data.joukkueet) {
        if (joukkue.id > suurinId) {
            suurinId = joukkue.id;
        }
    }

    let loydettySarja;
    for (let sarjaObjekti of data.sarjat) {
        if (Number(sarja) == sarjaObjekti.id) {
            loydettySarja = sarjaObjekti;
        }
    }

    let loydetytLeimaukset = [];
    for (let i = 0; i < data.leimaustavat.length; i++) {
        for (let leimaus of leimaustavat) {
            if (leimaus == data.leimaustavat[i]) {
                let loydettyLeimaus = i;
                loydetytLeimaukset.push(loydettyLeimaus);
            }
        }
    }

    // Alustetaan uusi joukkue
    let laskuri = 0;
    for (let joukkue of data.joukkueet) {
        if (joukkue.nimi.toUpperCase().trim() == nimi.toUpperCase().trim()) {
            laskuri++;
        }
    }

    // Alustetaan uusi joukkue
    let uusiJoukkue = {
        id: suurinId+1,
        nimi: nimi,
        jasenet: jasenet.filter((jasen) => jasen),
        leimaustapa: loydetytLeimaukset,
        rastileimaukset: [],
        sarja: loydettySarja,
        pisteet: 0,
        matka: 0,
        aika: "00:00:00",
    };

    // Tarkistetaan leimaustavat
    let laskuri2 = 0;
    let leimausOikein = false;
    for (let i = 0; i < leimaustavat.length; i++) {
        if (data.leimaustavat.includes(leimaustavat[i]) == true) {
            laskuri2++;
        }
    }

    if (laskuri2 == leimaustavat.length) {
        leimausOikein = true;
    }

    // Tarkistetaan sarja
    let sarjaOikein = false;
    for (let sarjaObjekti of data.sarjat) {
        if (sarjaObjekti.id == sarja) {
            sarjaOikein = true;
        }
    }

    if (laskuri == 0 && loydetytLeimaukset.length != 0 && leimausOikein == true && jasenet.length > 1 && tarkistaJasenet(jasenet) == true && sarjaOikein == true) {
        data.joukkueet.push(uusiJoukkue);
        console.log("Joukkueen lisääminen onnistui");
        console.log(data);
        return data;
    }
    console.log("Joukkueen lisääminen epäonnistui");
    console.log(data);
    return data;
}

/**
 * Tarkistaa joukkueelle syötettyjen jäsenien nimet etsien duplikaatteja
 * @param {*} jasenet 
 * @returns {boolean} true jos ei löydy samoja nimiä, false jos jäsenillä on
 * kaksi samaa nimeä
 */
function tarkistaJasenet(jasenet) {
    let set = new Set(jasenet);
    if (set.size == jasenet.length) {
        return true;
    }
    return false;
}

/**
  * Taso 3
  * Laskee joukkueen käyttämän ajan. Tulos tallennetaan joukkue.aika-ominaisuuteen.
  * Matka lasketaan viimeisestä LAHTO-rastilla tehdystä leimauksesta alkaen aina
  * ensimmäiseen MAALI-rastilla tehtyyn leimaukseen asti. Leimauksia jotka tehdään
  * ennen lähtöleimausta tai maalileimauksen jälkeen ei huomioida.
  * @param {Object} joukkue
  * @return {Object} joukkue
  */
function laskeAika(joukkue) {
    let aloitusAika = "00:00:00";
    let lopetusAika = "00:00:00";
    let lahtoTaulukko = [];
    let maaliTaulukko = [];
    for (let rastileimaus of joukkue.rastileimaukset) {
        if (rastileimaus.length == 0 | typeof(rastileimaus.rasti) == "undefined") {
            //
        } else if (rastileimaus.rasti.koodi == "LAHTO") {
            lahtoTaulukko.push(rastileimaus.aika);
        } else if (rastileimaus.rasti.koodi == "MAALI") {
            maaliTaulukko.push(rastileimaus.aika);
        }

        for (let i = 0; i < lahtoTaulukko.length; i++) {
            if (i == 0) {
                aloitusAika = lahtoTaulukko[i];
            } else if (lahtoTaulukko[i] > aloitusAika) {
                aloitusAika = lahtoTaulukko[i];
            }
            console.log("Aloitusaika :" + aloitusAika);
        }

        for (let i = 0; i < maaliTaulukko.length; i++) {
            if (i == 0 && maaliTaulukko[i] > aloitusAika) {
                lopetusAika = maaliTaulukko[i];
            } else if (maaliTaulukko[i] < lopetusAika && maaliTaulukko[i] > aloitusAika) {
                lopetusAika = maaliTaulukko[i];
            }
            console.log("Lopetusaika :" + lopetusAika);
        }
    }
    let aika = new Date(lopetusAika) - new Date(aloitusAika);
    let sekunnit = Math.floor(aika / 1000);
    let tunnit = Math.floor(sekunnit / 3600);
    sekunnit = sekunnit % 3600;
    let minuutit = Math.floor(sekunnit / 60);
    sekunnit = sekunnit % 60;
    if (String(Math.abs(sekunnit)).charAt(0) == sekunnit) {
        sekunnit = '0' + sekunnit;
    }

    if (String(Math.abs(minuutit)).charAt(0) == minuutit) {
        minuutit = '0' + minuutit;
    }

    if (String(Math.abs(tunnit)).charAt(0) == tunnit) {
        tunnit = '0' + tunnit;
    }

    if ((sekunnit == 0 && minuutit == 0 && tunnit == 0) | (isNaN(sekunnit) == true && isNaN(minuutit) == true && isNaN(tunnit) == true)) {
        joukkue.aika = "";
    } else {
        joukkue.aika = tunnit + ":" + minuutit + ":" + sekunnit;
    }
    console.log(joukkue.aika);
    return joukkue;
}

/**
  * Taso 3 ja Taso 5
  *  Järjestää joukkueet järjestykseen haluttujen tietojen perusteella
  *  järjestetään ensisijaisesti kasvavaan aakkosjärjestykseen 
  *  Järjestäminen on tehtävä alkuperäisen taulukon kopiolle
  *  mainsort-parametrin mukaisen tiedon perusteella
  *  Joukkueen jäsenet järjestetään aina aakkosjärjestykseen
  *  Joukkueen leimaustavat järjestetään myös aina aakkosjärjestykseen leimastapojen nimien mukaan
  *  Isoilla ja pienillä kirjaimilla ei ole missään järjestämisissä merkitystä eikä myöskään alussa tai lopussa olevalla whitespacella
  *  sortorder-parametrin käsittely vain tasolla 5
  *  jos sortorder-parametrina on muuta kuin tyhjä taulukko, käytetään 
  *  sortorderin ilmoittamaa järjestystä eikä huomioida mainsort-parametria: 
  *  ensisijaisesti järjestetään taulukon ensimmäisen alkion tietojen perusteella, 
  *  toissijaisesti toisen jne.
  *  sortorder-taulukko sisältää objekteja, joissa kerrotaan järjestysehdon nimi (key),
  *  järjestyssuunta (1 = nouseva, -1 = laskeva) ja järjestetäänkö numeerisesti (true)
  *  vai aakkosjärjestykseen (false)
  *	 sortorder = [
  *	 {"key": "sarja", "order": 1, "numeric": false},
  *	 {"key": "nimi", "order": 1, "numeric": false},
  *	 {"key": "matka", "order": -1, "numeric": true},
  *	 {"key": "aika", "order": 1, "numeric": false},
  *	 {"key": "pisteet", "order": -1, "numeric": true}
  *	]
  * @param {Object} data - tietorakenne, jonka data.rastit-taulukko järjestetään 
  * @param {String} mainsort - ensimmäinen (ainoa) järjestysehto, joka voi olla nimi, sarja, matka, aika tai pisteet  TASO 3
  * @param {Array} sortorder - mahdollinen useampi järjestysehto TASO 5
  * @return {Array} palauttaa järjestetyn ja täydennetyn _kopion_ data.joukkueet-taulukosta
  */
function jarjestaJoukkueet(data, mainsort="nimi", sortorder=[] ) {
    function compare(a, b) {
        if (mainsort == "nimi" | mainsort == "aika") {
            let eka = a[mainsort].toUpperCase();
            let toka = b[mainsort].toUpperCase();
            if (eka === "") {
                return 1;
            }

            if (toka === "") {
                return -1;
            }

            if (eka < toka) {
                return -1;
            }
            if (eka > toka) {
                return 1;
            }
            return 0;
        } else if (mainsort == "sarja") {
            let eka = a[mainsort].nimi.toUpperCase();
            let toka = b[mainsort].nimi.toUpperCase();
            if (eka < toka) {
                return -1;
            }
            if (eka > toka) {
                return 1;
            }
            return 0;
        } else {
            let eka = a[mainsort];
            let toka = b[mainsort];
            if (eka < toka) {
                return -1;
            }
            if (eka > toka) {
                return 1;
            }
            return 0;
        }
    }

    function compare2(a, b) {
        let eka = a.toUpperCase().split(" ")[1];
        let toka = b.toUpperCase().split(" ")[1];
        if (eka < toka) {
            return -1;
        }
        if (eka > toka) {
            return 1;
        }
        return 0;
    }

    let joukkueet = data.joukkueet.slice();
    joukkueet.sort(compare);
    for (let i = 0; i < joukkueet.length; i++) {
        joukkueet[i].jasenet.sort(compare2);
    }
    console.log(data);
    return joukkueet;
}

/**
  * Taso 5
  * Laskee joukkueen kulkeman matkan. Matka tallennetaan joukkue.matka-ominaisuuteen
  * Laske kuinka pitkän matkan kukin joukkue on kulkenut eli laske kunkin rastivälin
  * pituus ja laske yhteen kunkin joukkueen kulkemat rastivälit. Jos rastille ei löydy
  * sijaintitietoa (lat ja lon), niin kyseistä rastia ei lasketa matkaan mukaan. Matka
  * lasketaan viimeisestä LAHTO-rastilla tehdystä leimauksesta alkaen aina
  * ensimmäiseen MAALI-rastilla tehtyyn leimaukseen asti. Leimauksia jotka tehdään
  * ennen lähtöleimausta tai maalileimauksen jälkeen ei huomioida.
  * Käytä annettua apufunktiota getDistanceFromLatLonInKm
  * @param {Object} joukkue
  * @return {Object} joukkue
  */
function laskeMatka(joukkue) {
    return joukkue;
}

/**
  * Taso 5
  * Laskee joukkueen saamat pisteet. Pistemäärä tallennetaan joukkue.pisteet-ominaisuuteen
  * Joukkue saa kustakin rastista pisteitä rastin koodin ensimmäisen merkin
  * verran. Jos rastin koodi on 9A, niin joukkue saa yhdeksän (9) pistettä. Jos rastin
  * koodin ensimmäinen merkki ei ole kokonaisluku, niin kyseisestä rastista saa nolla
  * (0) pistettä. Esim. rasteista LÄHTÖ ja F saa 0 pistettä.
  * Samasta rastista voi sama joukkue saada pisteitä vain yhden kerran. Jos
  * joukkue on leimannut saman rastin useampaan kertaan lasketaan kyseinen rasti
  * mukaan pisteisiin vain yhden kerran.
  * Rastileimauksia, jotka tehdään ennen lähtöleimausta tai maalileimauksen jälkeen, ei
  * huomioida.
  * Maalileimausta ei huomioida kuin vasta lähtöleimauksen jälkeen.
  * Jos joukkueella on useampi lähtöleimaus, niin pisteet lasketaan vasta
  * viimeisen lähtöleimauksen jälkeisistä rastileimauksista.
  * Joukkue, jolla ei ole ollenkaan rastileimauksia, saa 0 pistettä
  * @param {Object} joukkue
  * @return {Object} joukkue
  */
function laskePisteet(joukkue) {
    // 1. Pisteitä saa yhtä paljon kuin ensimmäisestä rastin koodin numerosta
    // muuten 0
    // 2. Rastit huomioidaan vain kerran
    // 3. Ennen lähtöä ja maalin jälkeen ei huomioida
    // 4. Maalileimaus huomioidaan vaan lähdön jälkeen
    // 5. Viimeisemmästä lähtöleimauksesta lasketaan jos on useita lähtöleimauksia
    // 6. Jos ei yhtään leimausta => 0 pts
    return joukkue;
}



// apufunktioita tasolle 5
/**
  * Laskee kahden pisteen välisen etäisyyden
  */
function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    let R = 6371; // Radius of the earth in km
    let dLat = deg2rad(lat2-lat1);  // deg2rad below
    let dLon = deg2rad(lon2-lon1);
    let a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon/2) * Math.sin(dLon/2)
        ;
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    let d = R * c; // Distance in km
    return d;
}
/**
   Muuntaa asteet radiaaneiksi
  */
function deg2rad(deg) {
    return deg * (Math.PI/180);
}

