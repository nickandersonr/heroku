/* This is where we'll call the API */

function searchBtn() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://www.omdbapi.com/", false);
    xhr.send();

    console.log(xhr.status);
    console.log(xhr.statusText);
}