
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

function handleErrors(response) {
    // force non-500 errors to be thrown
    if (!response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            throw Error(response.json()["message"]);
        }
        throw Error(response.statusText);
    }
    return response;
}


export function fetchDog(dogID) {
    return fetch(BASE_API_URL + "dog/" + dogID + "/")
        .then(handleErrors)
        .then(response => response.json())
}

export function fetchDogNearby(dogID) {
    return fetch(BASE_API_URL + "dog/" + dogID + "/nearby/")
        .then(handleErrors)
        .then(response => response.json())
}

export function fetchDogs(limit, offset) {
    return fetch(BASE_API_URL + "dogs/" + parameterize({
        "start": offset || 0,
        "limit": limit  || 10
    }))
        .then(handleErrors)
        .then(response => response.json())
}

export function fetchShelter(shelterID) {
    return fetch(BASE_API_URL + "shelter/" + shelterID + "/")
        .then(handleErrors)
        .then(response => response.json())
}

export function fetchShelterNearby(shelterID) {
    return fetch(BASE_API_URL + "shelter/" + shelterID + "/nearby/")
        .then(handleErrors)
        .then(response => response.json())
}

export function fetchShelters(limit, offset) {
    return fetch(BASE_API_URL + "shelters/" + parameterize({
        "start": offset || 0,
        "limit": limit  || 10
    }))
        .then(handleErrors)
        .then(response => response.json())
}

export function fetchPark(parkID) {
    return fetch(BASE_API_URL + "park/" + parkID + "/")
        .then(handleErrors)
        .then(response => response.json())
}

export function fetchParkNearby(parkID) {
    return fetch(BASE_API_URL + "park/" + parkID + "/nearby/")
        .then(handleErrors)
        .then(response => response.json())
}

export function fetchParks(limit, offset) {
    return fetch(BASE_API_URL + "parks/" + parameterize({
        "start": offset || 0,
        "limit": limit  || 10
    }))
        .then(handleErrors)
        .then(response => response.json())
}
