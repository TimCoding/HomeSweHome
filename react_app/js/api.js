
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


export function fetchDog(dogID) {
    return fetch(BASE_API_URL + "dog/" + dogID + "/")
        .then(response => response.json())
}

export function fetchDogs(limit, offset) {
    return fetch(BASE_API_URL + "dogs/" + parameterize({
        "start": offset || 0,
        "limit": limit  || 10
    }))
        .then(response => response.json())
}

export function fetchShelter(shelterID) {
    return fetch(BASE_API_URL + "shelter/" + shelterID + "/")
        .then(response => response.json())
}

export function fetchShelters(limit, offset) {
    return fetch(BASE_API_URL + "shelters/" + parameterize({
        "start": offset || 0,
        "limit": limit  || 10
    }))
}

export function fetchPark(parkID) {
    return fetch(BASE_API_URL + "park/" + parkID + "/")
        .then(response => response.json())
}

export function fetchParks(limit, offset) {
    return fetch(BASE_API_URL + "parks/" + parameterize({
        "start": offset || 0,
        "limit": limit  || 10
    }))
        .then(response => response.json())
}
