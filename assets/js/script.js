const filePath = "https://restcountries.com/v3.1/all";


const countries = [];
const countriesContainer = document.querySelector(".countries-container");
async function getCountries(){
    try{
      const response = await fetch(filePath);
      if(!response.ok){
        throw new Error("Veri alınamadı.");
      }
      const data = await response.json();
      countries.push(...data);
      renderCountries();
    }
    catch(error){
      console.log(error);
    }
  }

  function renderCountries(){
    countriesContainer.innerHTML = "";
    countries.forEach(country =>{
        countriesContainer.innerHTML +=  `
        <div class="countries">
                    <img src="${country.flags.png}" alt="">
                    <div class="country-container">
                        <h2>${country.name.common}</h2>
                        <div class="country-content">
                            <p>Population: <span>${country.population}</span></p>
                            <p>Region: <span>${country.region}</span></p>
                            <p>Capital: <span>${country.capital}</span> </p>
                        </div>
                    </div>
        `
    });
  
  }
  getCountries();


  document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const countriesContainer = document.querySelector(".countries-container");
    searchInput.addEventListener("keyup", () => {
        let searchText = searchInput.value.toLowerCase();
        let countryItems = document.querySelectorAll(".countries");

        countryItems.forEach(item => {
            let countryName = item.querySelector("h2").textContent.toLowerCase();
            item.style.display = countryName.includes(searchText) ? "block" : "none";
        });
    });
});