const filePath = "https://restcountries.com/v3.1/all";

const countries = [];
const countriesContainer = document.querySelector(".countries-container");
const modal = document.getElementById("countryModal");
const modalDetails = document.getElementById("modal-details");
const closeModal = document.querySelector(".close-modal");

async function getCountries() {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error("Veri alınamadı.");
        }
        const data = await response.json();
        countries.push(...data);
        renderCountries();
    } catch (error) {
        console.log(error);
    }
}

function renderCountries() {
    countriesContainer.innerHTML = "";
    countries.forEach((country, index) => {
        countriesContainer.innerHTML += `
        <div class="countries" data-index="${index}">
            <img src="${country.flags.png}" alt="">
            <div class="country-container">
                <h2>${country.name.common}</h2>
                <div class="country-content">
                    <p>Population: <span>${country.population.toLocaleString()}</span></p>
                    <p>Region: <span>${country.region}</span></p>
                    <p>Capital: <span>${country.capital ? country.capital[0] : "N/A"}</span></p>
                </div>
            </div>
        </div>`;
    });

    
    document.querySelectorAll(".countries").forEach(item => {
        item.addEventListener("click", function () {
            const countryIndex = this.getAttribute("data-index");
            openModal(countries[countryIndex]);
        });
    });
}


document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("keyup", () => {
        let searchText = searchInput.value.toLowerCase();
        document.querySelectorAll(".countries").forEach(item => {
            let countryName = item.querySelector("h2").textContent.toLowerCase();
            item.style.display = countryName.includes(searchText) ? "block" : "none";
        });
    });
});

function openModal(country) {
 
  
    modalDetails.innerHTML = ""; 
    modalDetails.innerHTML += `
    <div class="dark-countries">
        <img src="${country.flags.png}" alt="Flag of ${country.name.common}">
        <div class="dark-country-container">
            <h2>${country.name.common}</h2>
            <div class="dark-country-content">
                <p>Native Name: <span>${country.name.nativeName}</span></p>
                <p>Population: <span>${country.population}</span></p>
                <p>Region: <span>${country.region}</span></p>
                <p>Sub Region: <span>${country.subregion}</span></p>
                <p>Capital: <span>${country.capital}</span></p>
            </div>
            <div class="dark-country-details">
                <p>Top Level Domain: <span>${country.tld}</span></p>
                <p>Currencies: <span>${country.currencies}</span></p>
                <p>Languages: <span>${country.languages}</span></p>
            </div>
            <div class="dark-border">
                <h2>Border Countries:</h2>
                <div class="dark-border-box">
                    ${country.borders && country.borders.length > 0 
                        ? country.borders.map(border => `<p>${border}</p>`).join("") 
                        : "<p>None</p>"}
                </div>
            </div>
        </div>
    </div>`;
    modal.style.display = "flex";
}




closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});


getCountries();
