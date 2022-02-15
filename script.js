let price = 0;

function refreshPage() {
    window.location.reload();
}

function addArticle(newPrice) {
    price += newPrice;

    price = numb = Math.round((price + Number.EPSILON) * 100) / 100;

    let payPreis = document.getElementById("pay-preis");
    payPreis.innerText = price;
}

//für stempelkarte: zählervariable

//für rausfinden wea ist kleinster kaffepreis: Zwischenspeichervariable anlegen und chekchen,
//ist neuer Preus größer oder Kleiner als alter? --> bei kleiner: zwischenspeichernr