import { NavBar } from './navbar.jsx';
import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { CardDeck } from 'reactstrap';
import ShelterInfo from './shelterinfo.jsx';
import Map from './map.jsx';
import ShelterHours from './shelterhours.jsx';
import Reviews from './reviews.jsx';
import ParkCard from './parkcards.jsx';
import DogCard from './dogcards.jsx';


export class ShelterDetails extends Component {
	render() {
		return (
  		<div>
  			<NavBar/>
  			<br/>

				<ShelterInfo/>

        <Container>
          <Row>
            <Col xs="8">
              <Map/>
            </Col>
            <Col xs="4">
							<ShelterHours/>
            </Col>
          </Row>
        </Container>
				<br/>

				<Container>
					<Row>
						<Col>
							<Reviews/>
						</Col>
					</Row>
				</Container>
				<br/>

				<hr></hr>

				<Container>
					<h2>Recommended Dogs</h2>
					<CardDeck>
						<DogCard/>
						<DogCard/>
						<DogCard/>
					</CardDeck>
				</Container>
				<br/>

				<hr></hr>

				<Container>
					<h2>Recommended Parks</h2>
					<CardDeck>
						<ParkCard/>
						<ParkCard/>
						<ParkCard/>
					</CardDeck>
				</Container>
				<br/>
			</div>
		)
	}
}

window._ShelterDetails = ShelterDetails;
