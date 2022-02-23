let newPrice = 0;
let stempelkarte = 0;
let zwischenspeicher = 100;

function refreshPage() {
    window.location.reload();
}
/*
window.setInterval(function () {
    let elem = document.getElementById('artikelliste');
    elem.scrollTop = elem.scrollHeight;
}, 50);
*/

function updateScroll() {
    var element = document.getElementById("yourDivID");
    element.scrollTop = element.scrollHeight;
}

function bestellung(itemname, itemprice) {

    stempelKarteUpdate(itemprice);

    addPrice(itemprice);

    const orderlist = document.getElementById('orderlist');

    //LI tag erstellen
    const orderitem = document.createElement('li');

    //  IMAGE SECTION
    //img tag erstellen
    const orderitemimgtag = document.createElement('img');
    //Klassenname zu img anhängen
    orderitemimgtag.className = 'bon-artikel-bild';
    //Src zu img tag hinzufügen 
    orderitemimgtag.src = 'img/kaffee4.png';
    //Child an LI anhängen
    orderitem.appendChild(orderitemimgtag);

    //Span für rote Farbe erstellen
    const orderitempricespan = document.createElement('span');

    //textnode erstellen mit itemname and itemprice
    const orderitemname = document.createTextNode(itemname + ' ');
    const orderitemprice = document.createTextNode(itemprice + ' €');

    //span die klasse für rote farbe geben 
    orderitempricespan.className = 'bon-artikel-preis';

    //pricetextnode span zu span hinzufügen
    orderitempricespan.appendChild(orderitemprice);

    //Itemname tag und itemprice an LI anhängen
    orderitem.appendChild(orderitemname);

    //orderitempricespan an LI anhängen
    orderitem.appendChild(orderitempricespan);

    //LI an Parent id=orderlist anhängen
    orderlist.appendChild(orderitem);
}

function addPrice(price) {

    price += newPrice;

    newPrice = numb = Math.round((price + Number.EPSILON) * 100) / 100;

    let footerPreis = document.getElementById("footer-preis");
    footerPreis.innerText = newPrice;
}

function stempelKarteUpdate(itemprice) {
    //Anzahl im Bon Header
    stempelkarte++;
    const sk = document.getElementById('anzahl-stempel');
    sk.innerText = stempelkarte;

    //Zwischenspeicher updaten, wenn preis kleiner als vorheriger
    if (zwischenspeicher > itemprice) {
        zwischenspeicher = itemprice;
    }

    //Checken wann stempelkarte 5, 10 und 14 erreicht 
    if (stempelkarte === 5) {
        newPrice -= zwischenspeicher;

    } else if (stempelkarte === 10) {

    } else if (stempelkarte === 14) {

        stempelkarte = 0;
    }



}

function bezahlung() {

    //Price wieder auf null
    newPrice = 0.00;
    let footerPreis = document.getElementById("footer-preis");
    footerPreis.innerText = '0.00';

    //Bon leeren
    const orderlist = document.getElementById('orderlist');
    orderlist.innerText = '';
}

