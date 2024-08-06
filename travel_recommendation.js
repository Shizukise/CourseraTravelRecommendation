var searchWhat;
let toSearchFor;
const beachRecommendations = ['/static/praia1Brazil.jpg', "/static/praia2Australia"]
const templeRecommendations = ['/static/temple1osaka.jpg', "/static/temple2shanghai"]
const resultDiv = document.getElementById('result')
const countries = [];


function search() {
    cleanScreen();
    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            searchWhat = document.getElementById("searchInput").value;
            console.log("to search: ", searchWhat)
            for (let i = 0 ; i < data.Countries.length; i++) {
                if (searchWhat === data.Countries[i].name.toLowerCase()) {
                    toSearchFor = data.Countries[i].name
                    let citiesToGo = []
                    for (city of data.Countries[i]["cities"]) {
                        citiesToGo.push(city.name)
                    }
                    console.log("country to search : " ,toSearchFor)
                    console.log("Country found!")
                    console.log("available cities: ",citiesToGo)
                    const title = document.createElement('h2')
                    title.innerHTML = `${toSearchFor}`
                    const description = document.createElement('p')
                    description.innerHTML = `Find places to go in ${toSearchFor}! <br> Cities to discover: `
                    const cities = document.createElement('ul')
                    cities.className = "citiesUl"
                    for (let j = 0; j < citiesToGo.length ; j++) {
                        let newCity = document.createElement('li')
                        let newCityName = document.createElement('h4')
                        newCityName.innerHTML = data.Countries[i].cities[j].name
                        newCity.appendChild(newCityName)
                        let newCityDescription = document.createElement('p')
                        newCityDescription.innerHTML = data.Countries[i].cities[j].description
                        newCity.appendChild(newCityDescription)
                        let newCityImage = document.createElement('img')
                        newCityImage.src = data.Countries[i].cities[j].imageUrl
                        newCityImage.className = "cityImage"
                        newCity.appendChild(newCityName)
                        newCity.appendChild(newCityDescription)
                        newCity.appendChild(newCityImage)
                        cities.appendChild(newCity)
                    }
                    resultDiv.appendChild(title)
                    resultDiv.appendChild(description)
                    resultDiv.appendChild(cities)
                }
            }
            

    });
};

function cleanScreen () {
    resultDiv.textContent = ""
    resultDiv.innerHTML = ""
}