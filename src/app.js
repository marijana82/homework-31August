import axios from "axios";

console.log("It's nice to see you smile!");

//make reference to <div> tag in html and add <h1> to it with a Country Name!
const countryResults = document.getElementById("country-results");
//make reference to <div> tag in html and add <img> to it with an image
const worldImage = document.getElementById("world-image");
//make reference to <form> tag in html
const searchForm = document.getElementById("search-form");

//put event listener on searchForm
searchForm.addEventListener( "submit", fetchOneCountry);



//1. write async function that gets information about ALL countries with a GET request, and log the results in the console
//now get information for only one country, for example Norway

async function fetchAllCountries(name) {
    try {
        const result = await axios.get(`https://restcountries.com/v2/name/${name}`);
        const countryDetails = result.data[0];
        console.log(countryDetails);

        worldImage.innerHTML = `
        <div>
        <img src="http://www.clker.com/cliparts/1/9/d/3/11970983411463585044SteveLambert_Globe_1.svg.med.png" alt="spinning-globe" width=100px class="world"/>
        </div>
        `;

        countryResults.innerHTML = `
        <div class="country-results">
        <img src="${countryDetails.flag}" alt="country-flag" width=100px class="flag"/>
        <h2>${countryDetails.name}</h2>
        
        </div>
      
        <p>${countryDetails.name} is situated in ${countryDetails.region}. </p>
        <p>It has a population of ${countryDetails.population} people.</p>
        <p>The capital is ${countryDetails.capital} ${currencyChecker(countryDetails.currencies)}.</p>
        <p>They speak ${languageChecker(countryDetails.languages)}.</p>
        `;

    } catch(e) {
        console.error();
    }
} fetchAllCountries();


//2. write a function that calculates how many currencies a country has, and returns the result as a single string
//return sentences: 1 valuta: and you can pay with [currency]; 2 valuta's: and you can pay with [currency]'s and [currency]

function currencyChecker(tomaat) {
        let output = "and you can pay with ";
        if(tomaat.length === 2) {
            return output + `${tomaat[0].name} and ${tomaat[1].name}`;
        } else {
        return output + `${tomaat[0].name};`
    }
    }


//3. write a function that calculates how many LANGUAGES a country has, and returns the result as a single string

function languageChecker(banaan) {
    if(banaan.length >= 2) {
        return `${banaan[0].name} and ${banaan[1].name} and ${banaan[2].name}`;
    } else {
        return `${banaan[0].name}`;
    }
}


//3. write a function that searches for a specific country when the user clicks enter button or search button

function fetchOneCountry(e) {
    //makes sure the whole page does not refresh when I click on search button
    e.preventDefault();

    //make reference to <input> tag in html
    const queryField = document.getElementById("query-field");

    //roep async function fetchAllCountries aan op het moment dat het op de knop wordt gedrukt
    fetchAllCountries(queryField.value);

    //to make sure my search-field empties when finished
    queryField.value = " ";

}


