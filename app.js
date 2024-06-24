//Part1 : setting up all the option tags
let currencyLink = ''

let URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies${currencyLink}.json`


//Used querySelectorAll to select both the select tags
const currencyList = document.querySelectorAll('.currency')

const selectFrom = currencyList[0]
const selectTo = currencyList[1]
const inputBox = document.querySelector('#input_box');
const outputBox = document.querySelector('#output_box');


let currencyObj = {};

//A function to add all currencies as options using API

(async ()=> {
  let response = await fetch(URL)
  currencyObj = await response.json()
  for (const key in currencyObj) {

    const currencyOption = document.createElement('option')
    currencyOption.value = key
    //Changed the text to uppercase to imporve User Readability
    currencyOption.innerText = key.toUpperCase()
    //Used cloneNode here because the appendChild method cut-pastes currencyOption node to only one of the select tags
    const clone = currencyOption.cloneNode(true)
    selectFrom.appendChild(currencyOption);
    selectTo.appendChild(clone);
    //To add a default selected option in both select tags
    if(currencyOption.value === 'inr')
       currencyOption.selected = true
    if(currencyOption.value === 'usd')
       clone.selected = true
    
  }
})();

//Part2: Accessing currency exchange values and using them



const convertCurrency = async () =>{
  
  let baseCurrency = selectFrom.value;
  let exchangeCurrency = selectTo.value;

  let baseCurrencyValue = inputBox.value;

  if (baseCurrencyValue === "" || baseCurrencyValue < 1) {
    baseCurrencyValue = 1;
    baseCurrency.value = "1";
  }
  
  currencyLink = '/' + baseCurrency;
  URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies${currencyLink}.json`;
  
  
  let res = await fetch(URL);
  let data = await res.json();
  let conversionRate = Number(data[baseCurrency][exchangeCurrency]);
  let exchangeCurrencyValue = conversionRate * baseCurrencyValue;
  outputBox.value = `${exchangeCurrencyValue}`;
  
}

selectFrom.addEventListener('change', (e)=>{
  e.preventDefault();
  convertCurrency();
}
)

selectTo.addEventListener('change', (e)=>{
  e.preventDefault();
  convertCurrency();
}
)

inputBox.addEventListener('input', (e)=>{
  e.preventDefault();
  convertCurrency()
}
)



