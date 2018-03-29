
/**
 * These are functions that are wrappers around the API calls so we
 * won't be hard coding these everywhere.
 *
 * Just import these functions to use them.
 **/


const BASE_API_URL = "/api/";
const MAX_RESULTS = 100000000;


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
            return response;
        }
        throw new Error(response.statusText);
    }
    return response;
}

function throwError(json) {
    if("message" in json && "code" in json){
        throw new Error(json["message"]);
    }
    return json;
}


export function fetchDog(dogID) {
    return fetch(BASE_API_URL + "dog/" + dogID + "/")
        .then(handleErrors)
        .then(response => response.json())
        .then(throwError)
}

export function fetchDogNearby(dogID) {
    return fetch(BASE_API_URL + "dog/" + dogID + "/nearby/")
        .then(handleErrors)
        .then(response => response.json())
        .then(throwError)
}

export function fetchDogs(limit, offset) {
    return fetch(BASE_API_URL + "dogs/" + parameterize({
        "start": offset || 0,
        "limit": limit  || 10
    }))
        .then(handleErrors)
        .then(response => response.json())
        .then(throwError)
}

export function fetchShelter(shelterID) {
    return fetch(BASE_API_URL + "shelter/" + shelterID + "/")
        .then(handleErrors)
        .then(response => response.json())
        .then(throwError)
}

export function fetchShelterDogs(shelterID, limit, offset) {
    return fetch(BASE_API_URL + "shelter/" + shelterID + "/dogs/" + parameterize({
        "start": offset || 0,
        "limit": limit  || 10
    }))
        .then(handleErrors)
        .then(response => response.json())
        .then(throwError)
}

export function fetchShelterNearby(shelterID) {
    return fetch(BASE_API_URL + "shelter/" + shelterID + "/nearby/")
        .then(handleErrors)
        .then(response => response.json())
        .then(throwError)
}

export function fetchShelters(limit, offset) {
    return fetch(BASE_API_URL + "shelters/" + parameterize({
        "start": offset || 0,
        "limit": limit  || 10
    }))
        .then(handleErrors)
        .then(response => response.json())
        .then(throwError)
}

export function fetchPark(parkID) {
    return fetch(BASE_API_URL + "park/" + parkID + "/")
        .then(handleErrors)
        .then(response => response.json())
        .then(throwError)
}

export function fetchParkNearby(parkID) {
    return fetch(BASE_API_URL + "park/" + parkID + "/nearby/")
        .then(handleErrors)
        .then(response => response.json())
        .then(throwError)
}

export function fetchParks(limit, offset) {
    return fetch(BASE_API_URL + "parks/" + parameterize({
        "start": offset || 0,
        "limit": limit  || 10
    }))
        .then(handleErrors)
        .then(response => response.json())
        .then(throwError)
}


export class Paginator{

    /**
     * @param {number} per_page - Number of results to retrieve per fetch
     * @param {function} call - API endpoint function
     * @param {...Object} args - Additional arguments to pass to the endpoint function
     */
    constructor(per_page, call, ...args){
        this.pages = {};
        this.per_page = per_page;
        this.total = MAX_RESULTS;
        this.current = 0;
        this.call = (page) => {
            return call(...args, this.per_page, this.per_page * page).then(response => {
                let results = response["results"];
                this.total = response["total"];
                this.pages[page] = results;
                return results;
            });
        };
    }

    hasPage(page){
        return page >= 0 && page <= Math.floor(this.total / this.per_page);
    }

    fetchPage(page){
        if(!this.hasPage(page)){
            return new Promise((resolve, reject) => {
                resolve([]);
            });
        }
        if(page in this.pages){
            let self = this;
            return new Promise((resolve, reject) => {
                resolve(self.pages[page]);
            });
        }
        return this.call(page);
    }

    hasCurrentPage() {
        return this.hasPage(this.current);
    }

    fetchCurrentPage(){
        return this.fetchPage(this.current);
    }

    fetchFirstPage(){
        this.current = 0;
        return this.fetchCurrentPage();
    }

    fetchLastPage(){
        this.current = Math.floor(this.total / this.per_page);
        return this.fetchCurrentPage();
    }

    hasNextPage(){
        return this.hasPage(this.current + 1);
    }

    fetchNextPage(){
        this.current++;
        return this.fetchCurrentPage();
    }

    hasPreviousPage(){
        return this.hasPage(this.current - 1);
    }

    fetchPreviousPage(){
        this.current--;
        return this.fetchCurrentPage();
    }
}