import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import {NavBar} from './navbar.jsx';
import InfoCard from './infocard.jsx';
import { ControlledCarousel } from './carousel.jsx';
import ParkCard from './parkcards.jsx'

export default class DogDetails extends Component {
	render() {
		return (
			<div>
				<NavBar/>
				<br/>
				<ControlledCarousel/>	//carousel looks a little too big rn
				<Container>
					<Row className="description_box">
						<Col md="8">
							<h5>Description</h5>
							<p className="description_content">description goes here</p>
						</Col>
						<Col md="4">
							<InfoCard/>
						</Col>
					</Row>
				</Container>
				<Container>
					<Row>
						<Col md="12">
							<h2>Recommended Parks</h2>
							//later add in the parkcard
							<ParkCard/>
						</Col>
					</Row>
				</Container>
			</div>
		)
	}
}

window._DogDetails = DogDetails;