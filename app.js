// global constants
const searchUrl = 'http://api.giphy.com/v1/gifs/search?api_key=';
const trendUrl = 'http://api.giphy.com/v1/gifs/trending?api_key=';
const APIkey = "KiBPZMEFecHeIfCzZrPuDCMdXLYLH71n";
const limit = 9;
const rating = 'g';

const gifResultsElement = document.getElementById('gif-results');
const searchInputElement = document.getElementById('search-input');
const searchButtonElement = document.getElementById('search-btn');
const loadButtonElement = document.getElementById('load-more-gifs-btn');
const pageNumberButtonElement = document.getElementById('page-number');

var page = 0;
var offset = page*limit;
var searchValue = '';

async function getSearchResults(searchParam) {
    const response = await fetch(`${searchUrl}${APIkey}&q=${searchParam}&limit=${limit}&rating=${rating}&offset=${offset}`);
    const jsonResponse = await response.json();
    const data = jsonResponse.data;
    data.forEach(element => {
        displayGIF(element);
    });
}

searchButtonElement.addEventListener("click", function () {
    // make load more gifs button appear
    loadButtonElement.classList.remove('hidden');

    // clear gifResults
    page = 0;
    gifResultsElement.innerHTML = ``;

    searchValue = searchInputElement.value;
    getSearchResults(searchInputElement.value);
    // reset search bar
    searchInputElement.value = '';
});

function displayGIF(element) {
    let url = element.images.original.url;
    gifResultsElement.innerHTML += `
        <img src="${url}"/>
    `;
}

loadButtonElement.addEventListener("click", function () {
    page++;
    offset = page*limit;
    getSearchResults(searchValue);
    searchInputElement.value = '';
});