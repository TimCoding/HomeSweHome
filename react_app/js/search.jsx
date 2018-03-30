import React from 'react';
import {Container, Row, Col} from 'reactstrap';
import {PawSpinner} from './spinner.jsx';
import {NavBar} from './navbar.jsx';
import DogCard from './dogcards.jsx';
import ShelterCard from './sheltercards.jsx'
import ParkCard from './parkcards.jsx';

import * as api from './api.js';

class Search extends React.Component {
  constructor(props) {
  {
    super(props);
    this.state = {
        dogsJSON: null,
        error: null,
        sheltersJSON: null,
        parksJSON: null
    }}
  }

  componentDidMount() {
    /* do api calls here */
    api.fetchDogsSearchFull(this.props.query)
    .then(dogsJSON => this.setState({
        dogsJSON: dogsJSON
      }))
    .catch(error => this.setState({
        error: "Dog Searching API Error"
    }));

    api.fetchSheltersSearchFull(this.props.query)
    .then(sheltersJSON => this.setState({
        sheltersJSON: sheltersJSON
      }))
    .catch(error => this.setState({
        error: "Shelter Searching API Error"
    }));

    api.fetchParksSearchFull(this.props.query)
    .then(parksJSON => this.setState({
        parksJSON: parksJSON
      }))
    .catch(error => this.setState({
        error: "Park Searching API Error"
    }));
  }

  render() {
    /* Create static content */
    var dogStaticContent = (
      <Row>
        <Col md="12">
          <h2> Dog Results </h2>
        </Col>
      </Row>
    );

    var shelterStaticContent = (
      <Row>
        <Col md="12">
          <h2> Shelter Results </h2>
        </Col>
      </Row>
    );

    var parkStaticContent = (
      <Row>
        <Col md="12">
          <h2> Park Results </h2>
        </Col>
      </Row>
    );

    /* Create card lists */
    var dogList;
    var parkList;
    var shelterList;

    if (this.state.dogsJSON != null) {
      dogList = this.state.dogsJSON.results.map(dog => {
          return (
            <Col md="3">
              <DogCard dogData={dog}/>
            </Col>
          );
        })
      if(this.state.dogsJSON.total == 0) {
        dogList = (
            <Col md="12">
              <p> No Results </p>
            </Col>
          );
      }
    } 
    if (this.state.parksJSON != null) {
      parkList = this.state.parksJSON.results.map(park => {
          return (
            <Col md="3">
              <ParkCard parkData={park}/>
            </Col>
          );
        })
      if (this.state.parksJSON.total == 0) {
        parkList = (
            <Col md="12">
              <p> No Results </p>
            </Col>
          );
      }
    }
    if (this.state.sheltersJSON != null) {
      shelterList = this.state.sheltersJSON.results.map(shelter => {
          return (
            <Col md="3">
              <ShelterCard shelterData={shelter}/>
            </Col>
          );
        })
      if(this.state.sheltersJSON.total == 0) {
        shelterList = (
            <Col md="12">
              <p> No Results </p>
            </Col>
          );
      }
    }

    return (
      <div>
        <NavBar/>
        <Container>
          {dogStaticContent}
          <Row> {dogList} </Row>
        </Container>
        <Container>
          {shelterStaticContent}
          <Row> {shelterList} </Row>
        </Container>
        <Container>
          {parkStaticContent}
          <Row> {parkList} </Row>
        </Container>
      </div>
    );
  }
}

window._Search = Search