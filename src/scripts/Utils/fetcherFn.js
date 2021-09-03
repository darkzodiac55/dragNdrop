const freq = new XMLHttpRequest()

freq.onload = (e) => {
    console.log('requesting');
    console.log(freq);
    let nfreq = JSON.parse(freq.responseText)

    console.log(nfreq.ticker.price + nfreq.ticker.target);
}

freq.onerror = (e) => {
    console.log(e);
    console.log(this);
}

freq.open('GET', 'https://api.cryptonator.com/api/ticker/btc-usd')

freq.send()
