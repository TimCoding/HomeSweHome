import React, { Component } from 'react';
import { Container, Row, Col, Jumbotron } from 'reactstrap';
import ReactDOM from 'react-dom';
import {NavBar} from './navbar.jsx';
import * as api from './api.js';
import {PawSpinner} from './spinner.jsx';
import DogCard from './dogcards.jsx';
import ShelterCard from './sheltercards.jsx'
import ParkCard from './parkcards.jsx';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
  Form, FormGroup, Label, Input, FormText, Button } from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {StarsRating} from './stars.jsx';
import {Sort} from './dropdown.jsx';
import Multiselect from 'react-select';
import 'react-select/dist/react-select.css';

export default class ModelPage extends Component {
  constructor(props) {
    super(props);

    if(this.props.model === "dogs"){
      this.resultsPaginator = new api.Paginator(12, api.fetchDogs);
    } else if (this.props.model === "shelters") {
      this.resultsPaginator = new api.Paginator(12, api.fetchShelters);
    } else if (this.props.model === "parks") {
      this.resultsPaginator = new api.Paginator(12, api.fetchParks);
    }

    this.state = {
      results: null,
      resultsLoading: true,
      error: null,
      breeds:[],
      cities:[],
      selectedBreeds: "",
      selectedCities: "",
      orderByValue: [],
      ratingOrder: [],
      sortByValue: [],
      ratingSort: [],
      checkedVals: {}
    };

    this.toggleRatings = this.toggleRatings.bind(this);
    this.toggleOrderBy = this.toggleOrderBy.bind(this);
    this.clickLoadMore = this.clickLoadMore.bind(this);
    this.scrollHandle = this.scrollHandle.bind(this);
    this.handleOrderBy = this.handleOrderBy.bind(this);
    this.handleBreedsFilter = this.handleBreedsFilter.bind(this);
    this.handleCitiesFilter = this.handleCitiesFilter.bind(this);
    this.handleRatingsFilter = this.handleRatingsFilter.bind(this);
    this.updateQuery = this.updateQuery.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.scrollHandle);
    this.resultsPaginator.fetchFirstPage()
    .then(results => this.setState({
      results: results,
      resultsLoading: false
    }))
    .catch(error => this.setState({
      error: error.message
    }));
    if (this.props.model === "dogs") {
      api.fetchDogBreeds()
      .then(breeds => this.setState({
        breeds: breeds.results.sort()
      }))
      .catch(error => this.setState({
        error: error.message
      }));
      api.fetchDogCities()
      .then(cities => this.setState({
        cities: cities.results.sort()
      }))
      .catch(error => this.setState({
        error: error.message
      }));
    } else if (this.props.model === "parks") {
      api.fetchParkCities()
      .then(cities => this.setState({
        cities: cities.results.sort()
      }))
    } else if (this.props.model === "shelters") {
      api.fetchShelterCities()
      .then(cities => this.setState({
        cities: cities.results.sort()
      }))
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollHandle);
  }

  clickLoadMore() {
    this.setState({
      resultsLoading: true
    });
    this.resultsPaginator.fetchNextPage()
    .then(results => this.setState({
      results: this.state.results.concat(results),
      resultsLoading: false
    }))
    .catch(error => this.setState({
      error: error.message
    }));
  }

  scrollHandle(event){
    if (this.state.resultsLoading || !this.resultsPaginator.hasNextPage()) {
      return;
    }
    // https://stackoverflow.com/questions/9439725/javascript-how-to-detect-if-browser-window-is-scrolled-to-bottom
    let scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    let scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;

    let scrolledToBottom = (scrollTop + window.innerHeight) >= scrollHeight;

    if (scrolledToBottom) {
      this.clickLoadMore();
    }
  }

  toggleRatings() {
    this.setState({
      ratingsFilterOpen: !this.state.ratingsFilterOpen
    });
  }

  toggleOrderBy() {
    this.setState({
      orderByOpen: !this.state.orderByOpen
    });
  }

  handleReset(event) {
    this.setState({
      orderByValue: [],
      sortByValue: [],
      selectedBreeds: "",
      selectedCities: "",
      checkedVals: {},
      selectedRating: undefined},
      function () {
        this.updateQuery()
      });
  }

  handleOrderBy(event) {
    if (this.props.model == "parks") {

      if (event.target.name == "name") {
        let nameIndex = this.state.orderByValue.indexOf("name")
        if (nameIndex > -1) {
          this.state.sortByValue.splice(nameIndex, 1, event.target.id)
        } else {
          this.state.orderByValue.push(event.target.name)
          this.state.sortByValue.push(event.target.id)
        }
      }

      if (event.target.name == "yelp_rating") {
        let ratingIndex = this.state.orderByValue.indexOf("yelp_rating")
        if (ratingIndex > -1) {
          this.state.sortByValue.splice(ratingIndex, 1, event.target.id)
        } else {
          this.state.orderByValue.push(event.target.name)
          this.state.sortByValue.push(event.target.id)
        }
      }
      this.updateQuery()

    } else {
      this.setState({
        orderByValue: event.target.name,
        sortByValue: event.target.id
      }, function () {
        this.updateQuery()
      });
    }
  }

  handleBreedsFilter(value) {
    this.setState({selectedBreeds: value}, function () {
      this.updateQuery()
    })
  }

  handleCitiesFilter(value) {
    this.setState({selectedCities: value}, function () {
      this.updateQuery()
    })
  }

  handleRatingsFilter(event) {
    this.setState({
      selectedRating: event.currentTarget.name
    }, function () {
      this.updateQuery()
    })
  }

  updateQuery(){
    let query = {};
    let endpoint = null;

    if (this.state.selectedCities != "") {
      console.log(this.state.selectedCities)
      query["city"] = this.state.selectedCities.split(",");
    } else {
      query["city"] = [];
    }
    if (this.props.model === "dogs") {
      if (this.state.selectedBreeds != "") {
        query["breed"] = this.state.selectedBreeds.split(",")
      } else {
        query["breed"] = [];
      }
      endpoint = api.fetchDogsSearch;
    } else if (this.props.model === "shelters") {
      endpoint = api.fetchSheltersSearch;
    } else if (this.props.model ===  "parks") {
      if(!(this.state.selectedRating == undefined)) {
        query["rating"] = this.state.selectedRating;
      }
      endpoint = api.fetchParksSearch;
    } else {
      console.error("Shouldn't reach this");
      return;
    }
    if(this.state.orderByValue != []) {
      query["orderby"] = this.state.orderByValue;
    }
    if(this.state.sortByValue != []) {
      query["sort"] = this.state.sortByValue;
    }
    console.log(query);
    this.setState({
      resultsLoading: true,
      results: []
    }, () => {
      this.resultsPaginator = new api.Paginator(12, endpoint, query);
      this.resultsPaginator.fetchFirstPage()
      .then(results => this.setState({
        results: results,
        resultsLoading: false
      }))
      .catch(error => this.setState({
        error: error.message
      }));
    });
  }

  renderBreedsDropdown(options) {
    return (
      <Col md="4"
        style={{"paddingBottom":"10px"}}>
        <Multiselect multi id="multiselect"
          closeOnSelect={false}
          onChange={this.handleBreedsFilter}
          options={options}
          placeholder="Breeds"
          removeSelected={true}
          simpleValue
          value={this.state.selectedBreeds}/>
      </Col>
    );
  }

  renderCitiesDropdown(options) {
    return (
      <Col md="3"
        style={{"paddingBottom":"10px"}}>
        <Multiselect multi
          closeOnSelect={false}
          onChange={this.handleCitiesFilter}
          options={options}
          placeholder="Cities"
          removeSelected={true}
          simpleValue
          value={this.state.selectedCities}/>
      </Col>
    );
  }

  renderRatingsDropdown(options) {
    return (
      <Dropdown isOpen={this.state.ratingsFilterOpen}
        toggle={this.toggleRatings}>
        <DropdownToggle caret>
          Ratings
        </DropdownToggle>
        <DropdownMenu className="dropdown-scroll">
          {options}
        </DropdownMenu>
      </Dropdown>
    );
  }

  renderOrderByDropdown(options) {
    return (
      <Dropdown isOpen={this.state.orderByOpen}
        toggle={this.toggleOrderBy}>
        <DropdownToggle caret>
          Order by
        </DropdownToggle>
        <DropdownMenu>
          {options}
        </DropdownMenu>
      </Dropdown>
    );
  }

  renderReset() {
    return (
      <Button className="btn btn-outline-info"
        onClick={this.handleReset}>Reset Filters</Button>
    );
  }

  render() {

    if (!(this.state.error == null)) {
      return (
        <div>
          <NavBar/>
          <Container>
            <h1 className="text-center text-danger">{this.state.error}</h1>
          </Container>
        </div>
      );
    }

    let loadMore = [];
    if (this.state.resultsLoading) {
      loadMore.push(
        <h1 className="text-center" style={{fontSize: '4.5em'}}><PawSpinner/></h1>
      );
    }

    if (this.resultsPaginator.hasNextPage()) {
      loadMore.push(
        <h1 className="text-center">
          <a href="javascript:undefined" onClick={this.clickLoadMore}>
            <FontAwesomeIcon icon="angle-down"/>
          </a>
        </h1>
      );
    }


    if (this.props.model === 'dogs') {
      const staticContent = (
        <div>
          <NavBar/>
            <Jumbotron style={{
              backgroundImage:  "url(/static/img/dog1.jpg)",
              backgroundSize: "cover",
              minHeight:"500px",
              maxHeight:"500px"
            }}>
              <Container>
                <Row className="models_top">
                  <Col md="8">
                    <p className="models_content" style={{
                      color: "white",
                      textShadow: "0 0 25px #000, 0 0 25px #000"
                    }}>We at HomeSweHome believe that every dog deserves a home with a loving family.
                    We also know that every dog has the potential to be a fine addition to any family. Browse through
                    our list of adoptable dogs today and find a new family member. Our dogs come in all shapes and sizes, but each
                    and every one of them have a huge heart made just for loving you! So stay awhile and help one of our good
                    doggies find their Home Sweet Home.</p>
                    <h3 className="models_content"
                    style={{
                      color: "white",
                      textShadow: "0 0 25px #000, 0 0 25px #000"
                    }}>"Dogs are not our whole life, but they make our lives whole." -Roger Caras</h3>
                </Col>
                </Row>
              </Container>
            </Jumbotron>
        </div>
      );

      if(this.state.results == null) {
        return (
          <div>
            {staticContent}
            <Container>
              <h1 className="text-center" style={{fontSize: '6em'}}><PawSpinner /></h1>
            </Container>
          </div>
        );
      }

      let dogList = this.state.results.map(dog => {
        return (
          <Col md="3">
            <DogCard dogData={dog}/>
          </Col>
        );
      });

      if (!this.state.resultsLoading && this.state.results.length == 0) {
        dogList = (
          <Col md="12">
            <p> No Results </p>
          </Col>
        );
      }

      let orderOptions = [["name", "ASC", "Name (A-Z)"], ["name", "DESC", "Name (Z-A)"]].map(option => {
        return (
          <DropdownItem name={option[0]}
            id={option[1]}
            onClick={this.handleOrderBy}
            style={{fontWeight: (this.state.orderByValue == option[0] &&
              this.state.sortByValue ==  option[1]) ? "bold" : "normal"}}>{option[2]}</DropdownItem>
          );
        });

        let breedsOptions = this.state.breeds.map(breed => {
          return (
            {
              label: breed,
              value: breed
            }
          )
        });

        let citiesOptions = this.state.cities.map(city => {
          return (
            {
              label: city,
              value: city
            }
          )
        });

        return (
          <div>
            {staticContent}
            <Container>

              <h2>Dogs</h2>
              <Row>
                {this.renderBreedsDropdown(breedsOptions)}
                {this.renderCitiesDropdown(citiesOptions)}
                <Col md="auto">
                  {this.renderOrderByDropdown(orderOptions)}
                </Col>
                <Col md="auto">
                  {this.renderReset()}
                </Col>
              </Row><br/>
              <Row>
                {dogList}
              </Row>
              {loadMore}
            </Container>
          </div>
        );
      } else if (this.props.model === 'parks') {
        const staticContent = (
          <div>
            <NavBar/>
              <Jumbotron style={{
                backgroundImage:  "url(/static/img/dog2.jpg)",
                backgroundSize: "cover",
                minHeight:"500px",
                maxHeight:"600px"
              }}>
                <Container>
                  <Row className="models_top">
                    <Col md="10">
                      <p className="models_content" style={{
                        color: "white",
                        textShadow: "0 0 25px #000, 0 0 25px #000"
                      }}>There is no place like the great outdoors to make memories!
                        Luckily for you we compiled a list of all the parks we think are cool. All you have to do is focus on spending
                        time with your favorite four-legged buddy. Here is a selection of all parks that we
                        recommend. You will find shelters and dogs in need of an adoption near each park you look at.
                        Please look around and plan your first puppy date today!</p>
                      <h3 className="models_content"
                      style={{
                        color: "white",
                        textShadow: "0 0 25px #000, 0 0 25px #000"
                      }}>"It is amazing how much love and laughter they bring into our lives and even how much closer
                        we become with each other because of them." – John Grogan</h3>
                    </Col>
                  </Row>
                </Container>
              </Jumbotron>
          </div>
        );

        if(this.state.results == null) {
          return (
            <div>
              {staticContent}
              <Container>
                <h1 className="text-center" style={{fontSize: '6em'}}><PawSpinner /></h1>
              </Container>
            </div>
          );
        }

        let parkList = this.state.results.map(park => {
          return (
            <Col md="3">
              <ParkCard parkData={park}/>
            </Col>
          );
        });

        if (!this.state.resultsLoading && this.state.results.length == 0) {
          parkList = (
            <Col md="12">
              <p> No Results </p>
            </Col>
          );
        }

        let nameSort = [["name", "ASC", "Name (A-Z)"],
        ["name", "DESC", "Name (Z-A)"]].map(option => {
          return (
            <DropdownItem name={option[0]}
              id={option[1]}
              onClick={this.handleOrderBy}
              style={{fontWeight: ((this.state.orderByValue.indexOf(option[0]) > -1 &&
                                    this.state.sortByValue[this.state.orderByValue.indexOf(option[0])] == option[1]) ? "bold" : "normal") }}>
              {option[2]}</DropdownItem>
          )
        });

        let ratingSort = [["yelp_rating", "ASC", "Lowest-Highest Rating"],
        ["yelp_rating", "DESC", "Highest-Lowest Rating"]].map(option =>{
          return (
            <DropdownItem name={option[0]}
              id={option[1]}
              onClick={this.handleOrderBy}
              style={{fontWeight: ((this.state.orderByValue.indexOf(option[0]) > -1 &&
                                    this.state.sortByValue[this.state.orderByValue.indexOf(option[0])] == option[1]) ? "bold" : "normal") }}>
              {option[2]}</DropdownItem>
          )
        });

        let citiesOptions = this.state.cities.map(city => {
          return (
            {
              label: city,
              value: city
            }
          )
        });

        let ratingsFilter = [5, 4, 3, 2, 1].map(rating => {
          return (
            <DropdownItem onClick={this.handleRatingsFilter}
              name={rating}
              style={{fontWeight: this.state.selectedRating == rating ? "bold" : "normal"}}>
              <StarsRating rating={rating}/> and up</DropdownItem>
            )
          });

          return (
            <div>
              {staticContent}
              <Container>
                <h2>Parks</h2>
                <Row>
                  {this.renderCitiesDropdown(citiesOptions)}
                  <Col md="auto">
                    {this.renderRatingsDropdown(ratingsFilter)}
                  </Col>
                  <Col md="auto">
                    {this.renderOrderByDropdown(nameSort)}
                  </Col>
                  <Col md="auto">
                    <Sort name="Order by Rating"
                      options={ratingSort}/>
                  </Col>
                  <Col md="auto">
                    {this.renderReset()}
                  </Col>
                </Row><br/>
                <Row>
                  {parkList}
                </Row>
                {loadMore}
              </Container>
            </div>
          );
        } else if (this.props.model === 'shelters') {
          const staticContent = (
            <div>
              <NavBar/>
                <Jumbotron style={{
                  backgroundImage:  "url(/static/img/dog3.jpg)",
                  backgroundSize: "cover",
                  minHeight:"500px",
                  maxHeight:"500px"
                }}>
                  <Container>
                    <Row className="models_top">
                      <Col md="8">
                        <p className="models_content" style={{
                          color: "white",
                          textShadow: "0 0 25px #000, 0 0 25px #000"
                        }}>Here you can browse a variety of adoption centers or animal shelters around Texas. Take a look around, your new best friend is waiting!</p>
                        <h3 className="models_content"
                        style={{
                          color: "white",
                          textShadow: "0 0 25px #000, 0 0 25px #000"
                        }}>"Dogs are great. Why stop at one? Get two, or three, or four. Just get the whole damn
                          shelter. Wouldn't you agree?" -Timothy Ho</h3>
                      </Col>
                    </Row>
                  </Container>
                </Jumbotron>
            </div>
          );

          if(this.state.results == null) {
            return (
              <div>
                {staticContent}
                <Container>
                  <h1 className="text-center" style={{fontSize: '6em'}}><PawSpinner /></h1>
                </Container>
              </div>
            );
          }

          let shelterList = this.state.results.map(shelter => {
            return (
              <Col md="3">
                <ShelterCard shelterData={shelter}/>
              </Col>
            );
          });

          if (!this.state.resultsLoading && this.state.results.length == 0) {
            shelterList = (
              <Col md="12">
                <p> No Results </p>
              </Col>
            );
          }

          let orderOptions = [["name", "ASC", "Name (A-Z)"], ["name", "DESC", "Name (Z-A)"]].map(option => {
            return (
              <DropdownItem name={option[0]}
                id={option[1]}
                onClick={this.handleOrderBy}
                style={{fontWeight: (this.state.orderByValue == option[0] && this.state.sortByValue == option[1]) ? "bold" : "normal"}}>{option[2]}</DropdownItem>
            )
          });

          let citiesOptions = this.state.cities.map(city => {
            return (
              {
                label: city,
                value: city
              }
            )
          });


          return (
            <div>
              {staticContent}
              <Container>
                <h2>Shelters</h2>
                <Row>
                  {this.renderCitiesDropdown(citiesOptions)}
                  <Col md="auto">
                    {this.renderOrderByDropdown(orderOptions)}
                  </Col>
                  <Col md="auto">
                    {this.renderReset()}
                  </Col>
                </Row><br/>
                <Row>
                  {shelterList}
                </Row>
                {loadMore}
              </Container>
            </div>
          );
        }

      }
    }

window._ModelPage = ModelPage;
