let newPrice = 0;
let stempelkarte = 0;
let bonnummer = 0;
let map = new Map();
let sortedMap = new Map();
let discount = 0;

function refreshPage() {
    window.location.reload();
}

function main(itemname, itemprice) {

    stempelkarte++;
    stempelKarteUpdate();

    addPrice(itemprice);

    const orderlist = document.getElementById('orderlist');
    orderlist.innerHTML += `
        <div id="bonnummer-${bonnummer}" class="test">
            <div class="bon-artikel-div">
                <div class="bon-artikel-zaehler">${1 + bonnummer + '.'}</div>
                <img src="img/kaffee4.png" class="bon-artikel-bild"></img>
                <span class="bon-artikel-text">${itemname}</span>
                <span class="bon-artikel-preis" id="span-${bonnummer}">${itemprice}</span>
            </div>
        </div> 
        `;

    //Checken wann stempelkarte 5, 10 und 14 erreicht 
    if (stempelkarte === 5) {
        updatePrice();

    } else if (stempelkarte === 10) {
        updatePrice();

    } else if (stempelkarte === 14) {
        stempelkarte = 0;
        updatePrice();

    }

    bonnummer++;
}

function stempelKarteUpdate() {
    //Anzahl im Bon Header
    const sk = document.getElementById('anzahl-stempel');
    sk.innerText = stempelkarte;
}

function addPrice(itemprice) {
    //Preis hinzufügen, index beginnt bei 1
    map.set(bonnummer, itemprice);

    //Preis berechnen und anzeigen bei Total
    const iterator = map.values();
    let sum = 0;
    for (let i = 0; i < map.size; i++) {
        sum += iterator.next().value;
    }

    sum = Math.round((sum + Number.EPSILON) * 100) / 100;

    document.getElementById("footer-preis").innerText = sum;

    newPrice = sum;

    //Map von klein nach groß sortieren
    const mapSort = new Map([...map.entries()].sort((a, b) => a[1] - b[1]));
    sortedMap = mapSort;
    console.log(newPrice)
}

function updatePrice() {
    //Nimm ersten Key und ersten Value
    const [firstKey] = sortedMap.keys();
    const [firstValue] = sortedMap.values();

    //Altem Preis, die neue Klasse geben für durchgestrichen
    document.getElementById('span-' + firstKey).className = 'bon-artikel-reduzierterpreis';

    //Neuen Preis 0.00€ hinzufügen
    document.getElementById('bonnummer-' + firstKey).innerHTML += `
    <span class="bon-artikel-gutschrift">0.00 € (Gutschrift)</span>
    `;

    //Ziehe Value vom Betrag ab und addiere Betrag zu Discount für Endkarte
    discount += firstValue;
    newPrice -= firstValue;
    newPrice = Math.round((newPrice + Number.EPSILON) * 100) / 100;
    document.getElementById("footer-preis").innerText = newPrice;


    //Lösche die erste Stelle
    sortedMap.delete(firstKey);
    map.delete(firstKey);
}

//Bezahl-Fenster-Animation
$(function () {
    $("#but1").click(function () {
        $(".fullscreen-container").fadeTo(200, 1);
    });
    $("#but2").click(function () {
        $(".fullscreen-container").fadeOut(200);
    });
});

function bezahlen() {

    //Rabatt anzeigen
    document.getElementById('end-rabatt').innerText = discount + ' €'

    //Finale Summe anzeigen
    document.getElementById("end-final").innerText = newPrice + ' €';
}


function ja() {
    //Weitere Bestellung aufgeben: Werte zurücksetzen, aber nicht Stempelkarte
    let footerPreis = document.getElementById("footer-preis");
    footerPreis.innerText = '0.00';

    newPrice = 0;
    bonnummer = 0;
    map.clear();
    sortedMap.clear();
    discount = 0;

    //Bon leeren
    const orderlist = document.getElementById('orderlist');
    orderlist.innerText = '';

    //Frage-Container entfernen
    document.getElementById('frage-container').outerHTML = "";
}

