
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

function parameterizeMultidict(multidict) {
    let paramStrings = [];
    for (const key of Object.keys(multidict)) {
        if(Array.isArray(multidict[key])){
            for(let i = 0; i < multidict[key].length; i++){
                paramStrings.push(encodeURIComponent(key) + "=" + encodeURIComponent(multidict[key][i]));
            }
        } else {
            paramStrings.push(encodeURIComponent(key) + "=" + encodeURIComponent(multidict[key]));
        }
    }
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

export function fetchDogBreeds() {
    return fetch(BASE_API_URL + "dogs/breeds/")
        .then(handleErrors)
        .then(response => response.json())
        .then(throwError)
}

export function fetchDogCities() {
    return fetch(BASE_API_URL + "dogs/cities/")
        .then(handleErrors)
        .then(response => response.json())
        .then(throwError)
}

export function fetchDogsSearch(query, limit, offset) {
    /**
     * `query` should be in the form:
     * <code>
     *     {
     *         breed: ["breed1", ...],
     *         city: ["city1", ...],
     *         orderby: "name",
     *         sort: "ASC" | "DESC"
     *     }
     * </code>
     * All of these fields are optional
     */
    let multidict = query;
    multidict["offset"] = offset || 0;
    multidict["limit"] = limit || 10;
    return fetch(BASE_API_URL + "dogs/search/" + parameterizeMultidict(multidict))
        .then(handleErrors)
        .then(response => response.json())
        .then(throwError)
}

export function fetchDogsSearchFull(query, limit, offset) {
    return fetch(BASE_API_URL + "dogs/search/full/" + parameterize({
        "query": query,
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

export function fetchShelterCities() {
    return fetch(BASE_API_URL + "shelters/cities/")
        .then(handleErrors)
        .then(response => response.json())
        .then(throwError)
}

export function fetchSheltersSearch(query, limit, offset) {
    /**
     * `query` should be in the form:
     * <code>
     *     {
     *         city: ["city1", ...],
     *         orderby: "name",
     *         sort: "ASC" | "DESC"
     *     }
     * </code>
     * All of these fields are optional
     */
    let multidict = query;
    multidict["offset"] = offset || 0;
    multidict["limit"] = limit || 10;
    return fetch(BASE_API_URL + "shelters/search/" + parameterizeMultidict(multidict))
        .then(handleErrors)
        .then(response => response.json())
        .then(throwError)
}

export function fetchSheltersSearchFull(query, limit, offset) {
    return fetch(BASE_API_URL + "shelters/search/full/" + parameterize({
        "query": query,
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

export function fetchParkCities() {
    return fetch(BASE_API_URL + "parks/cities/")
        .then(handleErrors)
        .then(response => response.json())
        .then(throwError)
}

export function fetchParksSearch(query, limit, offset) {
    /**
     * `query` should be in the form:
     * <code>
     *     {
     *         city: ["city1", ...],
     *         rating: 4.5,
     *         orderby: "name",
     *         sort: "ASC" | "DESC"
     *     }
     * </code>
     * All of these fields are optional
     */
    let multidict = query;
    multidict["offset"] = offset || 0;
    multidict["limit"] = limit || 10;
    return fetch(BASE_API_URL + "parks/search/" + parameterizeMultidict(multidict))
        .then(handleErrors)
        .then(response => response.json())
        .then(throwError)
}

export function fetchParksSearchFull(query, limit, offset) {
    return fetch(BASE_API_URL + "parks/search/full/" + parameterize({
        "query": query,
        "start": offset || 0,
        "limit": limit  || 10
    }))
        .then(handleErrors)
        .then(response => response.json())
        .then(throwError)
}

/**
 * Usage:
 * The basic usage is to make an instance of this class, supplying it an API function from this file.
 * The results are not guaranteed to be accurate until a fetch method is called for the first time.
 * `fetchFirstPage()` should always be accurate, so this is a good first function to call.
 * After the first fetch is successfully received, the instance should be fully initialized.
 *
 * Example in a React component:
 * <code>
 *     constructor(){
 *         this.parkPaginator = new Paginator(4, fetchParks);
 *
 *         // Needed for some weird `this` business
 *         this.loadPreviousButtonClick = this.loadPreviousButtonClick.bind(this);
 *         this.loadNextButtonClick = this.loadNextButtonClick.bind(this);
 *     }
 *
 *     componentDidMount(){
 *         this.parkPaginator.fetchFirstPage()
 *             .then((results) => this.setState({
 *                 parks: results
 *             }););
 *     }
 *
 *     loadNextButtonClick(){
 *         this.parkPaginator.fetchNextPage()
 *             .then((results) => this.setState({
 *                 parks: results
 *             }););
 *     }
 *
 *     loadPreviousButtonClick(){
 *         this.parkPaginator.fetchPreviousPage()
 *             .then((results) => this.setState({
 *                 parks: results
 *             }););
 *     }
 *
 *     render(){
 *         if(!this.parkPaginator().isInitialized()){
 *             return (<div>Loading...</div>);
 *         }
 *         let parkComponents = this.state.parks.map; //... map the result JSON list to components
 *         return (
 *             <div>
 *                 {parkComponents}
 *                 {this.parkPaginator.hasPreviousPage() ? <button onClick={this.loadPreviousButtonClick}>Previous</button> : ""}
 *                 {this.parkPaginator.hasNextPage() ? <button onClick={this.loadNextButtonClick}>Next</button> : ""}
 *             </div>
 *         );
 *     }
 * </code>
 */
export class Paginator{

    /**
     * Constructor to make a Paginator object.
     *
     * Make sure to look at usage to see how to use.
     *
     * @param {number} per_page - Number of results to retrieve per fetch
     * @param {function} call - API endpoint function, needs to have limit and offset as last two parameters, respectively
     * @param {...Object} args - Additional arguments to pass to the endpoint function
     */
    constructor(per_page, call, ...args){
        this.pages = {};
        this.per_page = per_page;
        this.total = MAX_RESULTS;
        this.current = 0;
        this.initialized = false;
        this.call = (page) => {
            return call(...args, this.per_page, this.per_page * page).then(response => {
                this.initialized = true;
                let results = response["results"];
                this.total = response["total"];
                this.pages[page] = results;
                return results;
            });
        };
    }

    /**
     * Checks whether or not the first request has been made to populate the total number of results
     * @returns {boolean} - True if the total number of results has been properly initialized
     */
    isInitialized(){
        return this.initialized;
    }

    /**
     * Returns the total amount of pages in the results
     * The highest page index would be totalPages() - 1 (0 indexed)
     * (Is not guaranteed to be correct is not initialized yet)
     *
     * @returns {number} - total number of pages in the result
     */
    totalPages(){
        return Math.floor(this.total / this.per_page) + 1;
    }

    /**
     * Checks if the the results have a page corresponding with the given page index
     * (Is not guaranteed to be correct is not initialized yet)
     *
     * @param {number} page - Index of the page to check
     * @returns {boolean} True if the page is in the bounds of the results
     */
    hasPage(page){
        return page >= 0 && page < this.totalPages();
    }

    /**
     * Fetches a list of JSON results for the given page
     * (Is not guaranteed to be correct is not initialized yet)
     *
     * @param page - Index of the page to check
     * @returns {Promise} - Promise that returns an array of at most `per_page` JSON results
     */
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

    /**
     * Returns the index of the current page
     * @returns {number} the index of the current page
     */
    getCurrentPageNumber(){
        return this.current;
    }

    /**
     * Sets the new index of the current page
     * @param {number} index - the new index of the current page
     */
    setCurrentPageNumber(index){
        this.current = index;
    }

    /**
     * Checks if the the results have a current page
     * (Is not guaranteed to be correct is not initialized yet)
     *
     * @returns {boolean} True if the current page is in the bounds of the results
     */
    hasCurrentPage() {
        return this.hasPage(this.current);
    }

    /**
     * Fetches a list of JSON results for the current page
     * @returns {Promise} - Promise that returns an array of at most `per_page` JSON results
     */
    fetchCurrentPage(){
        return this.fetchPage(this.current);
    }

    /**
     * Fetches a list of JSON results for the first page of the results
     * @returns {Promise} - Promise that returns an array of at most `per_page` JSON results
     */
    fetchFirstPage(){
        this.current = 0;
        return this.fetchCurrentPage();
    }

    /**
     * Fetches a list of JSON results for the last page of the results
     * (Is not guaranteed to be correct is not initialized yet)
     *
     * @returns {Promise} - Promise that returns an array of at most `per_page` JSON results
     */
    fetchLastPage(){
        this.current = this.totalPages() - 1;
        return this.fetchCurrentPage();
    }

    /**
     * Checks if the the results have a next page from the current page
     * (Is not guaranteed to be correct is not initialized yet)
     *
     * @returns {boolean} True if the page after the current page is in the bounds of the results
     */
    hasNextPage(){
        return this.hasPage(this.current + 1);
    }

    /**
     * Fetches a list of JSON results for the page after the current page
     * (Is not guaranteed to be correct is not initialized yet)
     *
     * @returns {Promise} - Promise that returns an array of at most `per_page` JSON results
     */
    fetchNextPage(){
        this.current++;
        return this.fetchCurrentPage();
    }

    /**
     * Checks if the the results have a page before the current page
     * @returns {boolean} True if the page before the current page is in the bounds of the results
     */
    hasPreviousPage(){
        return this.hasPage(this.current - 1);
    }

    /**
     * Fetches a list of JSON results for the page before the current page
     * @returns {Promise} - Promise that returns an array of at most `per_page` JSON results
     */
    fetchPreviousPage(){
        this.current--;
        return this.fetchCurrentPage();
    }
}
