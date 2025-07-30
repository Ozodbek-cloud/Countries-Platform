let list = document.querySelector(".count");
let button = document.querySelector(".dark-mode-toggle")
let navbar = document.querySelector(".navbar")
let body = document.querySelector("body")
let search = document.querySelector(".search-container")
let filtr = document.querySelector(".filtr")
let count = document.querySelector(".count")
let h = document.querySelector("h2")
let input = document.querySelector("input")

const res = () => {
    fetch('https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags')
        .then(res => res.json())
        .then(data => {
            data.forEach(element => {
                list.innerHTML += `
                    <div class="country">
                        <img src="${element.flags.png}" alt="photo of ${element.name.common}" width="100">
                        <h4><a href="_blank">${element.name.common}</a></h4>
                        <p><strong>Population:</strong> ${element.population.toLocaleString()}</p>
                        <p><strong>Region:</strong> ${element.region}</p>
                        <p><strong>Capital:</strong> ${element.capital?.[0] || 'N/A'}</p>
                    </div>
                `;
            });
        })
        .catch(error => console.error('Xatolik:', error));

    input.addEventListener("input", () => {
        fetch('https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags')
            .then(res => res.json())
            .then(data => {
                    list.innerHTML = null
                    const searchValue = input.value
                data.forEach(element => {
                    if (element.name.common.includes(searchValue)) {
                        list.innerHTML += `
                    <div class="country">
                        <img src="${element.flags.png}" alt="photo of ${element.name.common}" width="100">
                        <h4><a href="_blank">${element.name.common}</a></h4>
                        <p><strong>Population:</strong> ${element.population.toLocaleString()}</p>
                        <p><strong>Region:</strong> ${element.region}</p>
                        <p><strong>Capital:</strong> ${element.capital?.[0] || 'N/A'}</p>
                    </div>
                `;
                    }
                })
            })

    });

    filtr.addEventListener("change", () => {
        fetch('https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags')
            .then(res => res.json())
            .then(data => {
                    list.innerHTML = ""
                    const regionValue = filtr.value
                data.forEach(element => {
                    if (element.region === regionValue) {
                        list.innerHTML += `
                    <div class="country">
                        <img src="${element.flags.png}" alt="photo of ${element.name.common}" width="100">
                        <h4><a href="_blank">${element.name.common}</a></h4>
                        <p><strong>Population:</strong> ${element.population.toLocaleString()}</p>
                        <p><strong>Region:</strong> ${element.region}</p>
                        <p><strong>Capital:</strong> ${element.capital?.[0] || 'N/A'}</p>
                    </div>
                `;
                    }
                })
            })

    });
}
res();

button.addEventListener("click", () => {
    navbar.classList.toggle("dark-mode");
    body.classList.toggle("dark-body")
    search.classList.toggle("dark-mode")
    filtr.classList.toggle("dark-mode")
    count.classList.toggle("dark-count")
});