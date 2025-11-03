const apiKey = "6e8a6f6555e3119445b73aa1";
const apiURL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const amount = document.getElementById("amount");
const result = document.getElementById("result");
const convertBtn = document.getElementById("convertBtn");

let rates = {};

async function loadCurrencies() {
    const res = await fetch(apiURL);
    const data = await res.json();
    rates = data.conversion_rates;

    Object.keys(rates).forEach(code => {
        fromCurrency.innerHTML += `<option value="${code}">${code}</option>`;
        toCurrency.innerHTML += `<option value="${code}">${code}</option>`;
    });

    fromCurrency.value = "USD";
    toCurrency.value = "BRL";
}

function animateNumber(finalValue) {
    let current = 0;
    const step = finalValue / 60;

    const interval = setInterval(() => {
        current += step;
        result.innerText = current.toFixed(2);

        if (current >= finalValue) {
            clearInterval(interval);
            result.innerText = finalValue.toFixed(2);
        }
    }, 16);
}

function convert() {
    const from = fromCurrency.value;
    const to = toCurrency.value;
    const inputValue = parseFloat(amount.value);

    if (!inputValue) return;

    const valueInUSD = inputValue / rates[from];
    const converted = valueInUSD * rates[to];

    animateNumber(converted);
}

convertBtn.addEventListener("click", convert);

loadCurrencies();
