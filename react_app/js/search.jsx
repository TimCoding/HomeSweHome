import React from 'react';
import {Container, Row, Col} from 'reactstrap';
import {PawSpinner} from './spinner.jsx';
import {NavBar} from './navbar.jsx';
import DogCard from './dogcards.jsx';
import ShelterCard from './sheltercards.jsx'
import ParkCard from './parkcards.jsx';

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
    //do api calls here
  }

  render() {
    
    // if(this.state.dogsJSON == null) {
    //   return (
    //       <div> 
    //           <Container>
    //               <h1 className="text-center" style={{fontSize: '6em'}}><PawSpinner /></h1>
    //           </Container>
    //       </div>
    //   );
    // }

    //Create Lists
    var dogList;
    var parkList;
    var shelterList;

    // Later should check for length == 0
    if (this.state.dogsJSON != null) {
      dogList = this.state.dogsJSON.results.map(dog => {
          return (
            <Col md="3">
              <DogCard dogData={dog}/>
            </Col>
          );
        })
    } else {
      dogList = "No Results"
    }

    if (this.state.parksJSON != null) {
      parkList = this.state.parksJSON.results.map(park => {
          return (
            <Col md="3">
              <ParkCard parkData={park}/>
            </Col>
          );
        })
    } else {
      parkList = "No Results"
    }

    if (this.state.sheltersJSON != null) {
      shelterList = this.state.sheltersJSON.results.map(shelter => {
          return (
            <Col md="3">
              <ShelterCard shelterData={shelter}/>
            </Col>
          );
        })
    } else {
      shelterList = "No Results"
    }


    return (
      <div>
         <NavBar/>
         <Container>
          <Row>
            <Col md="12">
              <h2> Dog Results </h2>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              {dogList}
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col md="8">
            <h2> Shelter Results </h2>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              {shelterList}
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col md="8">
            <h2> Park Results </h2>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              {parkList}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

window._Search = Search