import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import {NavBar} from './navbar.jsx';
import InfoCard from './infocard.jsx';
import { ControlledCarousel } from './carousel.jsx';
import ParkCard from './parkcards.jsx';
import {CardDeck} from 'reactstrap';
import {fetchDog} from './api.js';

export default class DogDetails extends Component {
	render() {

		const data =[{"name":"test1"},{"name":"test2"}];
		const listItems = data.map((d) => <li key={d.name}>{d.name}</li>);
		let address = "test address";
		let phone_number = "111 111 1111";
		
		return (
			<div>
				<NavBar/>
				<br/>
				<ControlledCarousel/>
				<Container>
					<Row className="description_box">
						<Col md="8">
							<h5>Description</h5>
							<p className="description_content">description goes here</p>
						</Col>
						<Col md="4">
							<InfoCard address={address} phone_number = {phone_number}/>
						</Col>
					</Row>
				</Container>
				<Container>
				<h2>Recommended Parks</h2>
					<CardDeck>
						<Row>
							<ParkCard/>
							<ParkCard/>
						</Row>
					</CardDeck>
				</Container>
			</div>
		);
	}
}

window._DogDetails = DogDetails;