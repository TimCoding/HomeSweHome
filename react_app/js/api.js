
/**
 * These are functions that are wrappers around the API calls so we
 * won't be hard coding these everywhere.
 *
 * Just import these functions to use them.
 **/


const BASE_API_URL = "/api/";


function parameterize(params) {
    const paramStrings = Array.from(
        Object.entries(params),
        entry => encodeURIComponent(entry[0]) + "=" + encodeURIComponent(entry[1])
    );
    return "?" + paramStrings.join("&");
}


function fetchDog(dogID, responseCallback, errorCallback) {
    fetch(BASE_API_URL + "dog/" + dogID + "/")
        .then(response => responseCallback(response.json()))
        .catch(error => errorCallback(error));
}

function fetchDogs(limit, offset, responseCallback, errorCallback) {
    fetch(BASE_API_URL + "dogs/" + parameterize({
        "start": offset || 0,
        "limit": limit  || 10
    }))
        .then(response => responseCallback(response.json()))
        .catch(error => errorCallback(error));
}

function fetchShelter(shelterID, responseCallback, errorCallback) {
    fetch(BASE_API_URL + "shelter/" + shelterID + "/")
        .then(response => responseCallback(response.json()))
        .catch(error => errorCallback(error));
}

function fetchShelters(limit, offset, responseCallback, errorCallback) {
    fetch(BASE_API_URL + "shelters/" + parameterize({
        "start": offset || 0,
        "limit": limit  || 10
    }))
        .then(response => responseCallback(response.json()))
        .catch(error => errorCallback(error));
}

function fetchPark(parkID, responseCallback, errorCallback) {
    fetch(BASE_API_URL + "park/" + parkID + "/")
        .then(response => responseCallback(response.json()))
        .catch(error => errorCallback(error));
}

function fetchParks(limit, offset, responseCallback, errorCallback) {
    fetch(BASE_API_URL + "parks/" + parameterize({
        "start": offset || 0,
        "limit": limit  || 10
    }))
        .then(response => responseCallback(response.json()))
        .catch(error => errorCallback(error));
}
