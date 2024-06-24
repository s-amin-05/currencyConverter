//Part1 : setting up all the option tags
let currency = ''

let URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies${currency}.json`


// Accessed the data from the API

let currencyObj = {};


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
    currencyList[0].appendChild(currencyOption);
    currencyList[1].appendChild(clone);
    //To add a default selected option in both select tags
    if(currencyOption.value === 'inr')
       currencyOption.selected = true
    if(currencyOption.value === 'usd')
       clone.selected = true
    
  }
})();

// Accessed the both the select tags 
let currencyList = document.querySelectorAll('.currency')














