
/**
 * Collection of functions to get the URLS for pages without having to hard code them.
 **/

const BASE_URL = "/";

export function aboutURL() {
    return BASE_URL + "about/"
}

export function indexURL() {
    return BASE_URL;
}

export function dogURL(dogID) {
    return BASE_URL + "dog/" + dogID + "/";
}

export function dogsURL() {
    return BASE_URL + "dogs/"
}

export function shelterURL(shelterID) {
    return BASE_URL + "shelter/" + shelterID + "/";
}

export function sheltersURL() {
    return BASE_URL + "shelters/"
}

export function parkURL(parksID) {
    return BASE_URL + "park/" + parksID + "/";
}

export function parksURL() {
    return BASE_URL + "parks/"
}

export function searchURL() {
	return BASE_URL + "search/"
}