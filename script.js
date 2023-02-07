const form = document.querySelector("form")
const city = document.getElementById("city")
const api_key = 'd6863df76ca92fed8e86552baddf63a4'
const result_section = document.getElementById("result")
const info = document.getElementsByClassName("alert")
const cities_searched = []

// sample query: api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=d6863df76ca92fed8e86552baddf63a4

form.addEventListener("submit", (e) => {
    e.preventDefault()
    const city_name = city.value.trim()
    form.reset()
    // console.log(cities_searched)
    getWeather(city_name)
})

async function getWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${api_key}&units=metric`)
        if (!response.ok) {
            info[0].classList.remove("invisible")
            info[0].innerHTML = `Could not find any result for "${city}"`
            throw new Error(`## OOOPS! Could not fetch data! Error: ${response.status}`)
        }
        const data = await response.json()
        // console.log(data)
        for (const i in cities_searched) {
            if (cities_searched[i].toUpperCase() === city.toUpperCase()) {
                info[0].classList.remove("invisible")
                info[0].innerHTML = `Weather data for "${city}" is already on your list`
                throw new Error("already searched")
            }
        }
        cities_searched.push(city)
        renderWeather(data)
        if (!info[0].classList.contains("invisible")) {
            info[0].classList.add("invisible")
        }

    } catch (error) {
        console.log(error)
    }

}

function renderWeather(data) {
    const icon_src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    const new_card = document.createElement("div")
    new_card.setAttribute("class", "bg-primary card shadow-lg d-flex align-items-center justify-content-center text-light")
    new_card.setAttribute("style", "width: 18rem; height:26rem;")
    new_card.innerHTML = `<div class="card-body d-flex flex-column justify-content-around align-items-center">
            <h2 class="card-title d-flex align-items-center justify-content-center text-center" style="height: 110px;">${data.name.slice(0, 50)}</h2>
            <p class="card-text fs-2 mb-0 fw-bold">${Math.round(data.main.temp)} ºC</p>
            <img src=${icon_src}>
            <p class="card-text fs-5">${data.weather[0].main}</p>
            <p class="card-text">H: ${Math.round(data.main.temp_max)}º L: ${Math.round(data.main.temp_min)}º</p>
        </div>`

    result_section.prepend(new_card)
}