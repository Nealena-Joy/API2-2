const baseURL = 'https://api.giphy.com/v1/gifs/search';
const key = '?&api_key=ZA2QYQwCtoQRlcRt6B9DqjesGJs7Imzi';
let url;

// DOM
const searchTerm = document.querySelector('.search');
const searchForm = document.querySelector('form');
const submitBtn = document.querySelector('.submit');
// RESULTS
const resultsContainer = document.querySelector('.results-container');
const resultsText = document.querySelector('.results-text');
const section = document.querySelector('.card-columns');

// EVENT LISTENER
searchForm.addEventListener('submit', fetchResults);

function fetchResults(e){
    e.preventDefault();
    url = baseURL + key + '&q=' + searchTerm.value + `&limit=20`;
    console.log("URL: ", url);

    fetch(url)
        .then(function(result)  {
            return result.json();
        }) .then(function(json) {
            displayResults(json);
        });
}
function displayResults(json){
    while (section.firstChild){
        section.removeChild(section.firstChild);
    }

    if (json.data.length === 0) {
        let card = document.createElement('div');
        card.setAttribute('class', 'no-result')
        card.innerHTML = 'SORRY!<br>No gifs found. <br> Please try another keyword.'
        resultsContainer.append(card);

        let img1 = document.createElement('img');
        img1.src = './assets/bluebird.png';
        card.appendChild(img1);

        console.log( "No Results");

        const body = document.querySelector('.body');
        body.style.backgroundImage = 'none';


    } else {
        for (var i=0; i<json.data.length; i++){
            let card = document.createElement('div');
            card.setAttribute('class', 'card card-custom');
            section.appendChild(card);

            let imgLink = document.createElement('a')
            imgLink.href = json.data[i].images.fixed_height.url
            card.appendChild(imgLink);

            let img = document.createElement('img');
            img.src = json.data[i].images.fixed_width.url;
            img.setAttribute('class', 'card-img card-img custom');
            imgLink.appendChild(img);    
        }
    }
}
