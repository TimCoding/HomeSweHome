
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
    return BASE_URL + "dogs/";
}

export function shelterURL(shelterID) {
    return BASE_URL + "shelter/" + shelterID + "/";
}

export function sheltersURL() {
    return BASE_URL + "shelters/";
}

export function parkURL(parksID) {
    return BASE_URL + "park/" + parksID + "/";
}

export function parksURL() {
    return BASE_URL + "parks/"
}

export function searchURL(query) {
    let end = "";
    if (!(query == null)){
        end = "?query=" + encodeURIComponent(query);
    }
    return BASE_URL + "search/" + end;
}

export function petfinderDogURL(dogID){
    return "https://www.petfinder.com/dog/name-" + dogID + "/tx/city/shelter-tx0/";
}

export function petfinderShelterURL(shelterID){
    return "https://www.petfinder.com/member/us/tx/city/shelter-" + shelterID + "/";
}

export function yelpParkURL(yelpParkID){
    return "https://www.yelp.com/biz/" + yelpParkID;
}
