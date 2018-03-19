import React, { Component } from 'react';
import { Jumbotron, Container, Col,
	Row, Card, CardDeck, CardHeader, CardBlock } from 'reactstrap';
import { NavBar } from './navbar.jsx';
import Map from './map.jsx';
import Reviews from './reviews.jsx';
import DogCard from './dogcards.jsx';
import ShelterCard from './sheltercards.jsx';

export default class ParkDetails extends Component{
	render(){
		return (
			<div>
					<NavBar/>
					<Jumbotron>
						//Use this.prop.name here
						<h1>Park Name Here</h1>
					</Jumbotron>
					<Container>
							<Row>
								<Col md="8">
									<Map/>
								</Col>
								<Col md="4">
									<Card>
										<CardHeader>Description {/*this.props.description*/}</CardHeader>
										<CardBlock>
											Information about park here {/*this.props.information*/}
										</CardBlock>
									</Card>
								</Col>
								<Col md="8">
									<Reviews/>
								</Col>
								<Col md="4">
									<Card>
										<CardHeader>Information</CardHeader>
										<CardBlock>
											<ul className="fa-ul">
													<li><span className="fa-li"><i className="fas fa-paw"></i></span>Address {/*this.props.address*/}</li>
													<li><span className="fa-li"><i className="fas fa-paw"></i></span>Phone {/*this.props.phone*/}</li>
													<li><span className="fa-li"><i className="fas fa-paw"></i></span>Website {/*this.props.website*/}</li>
											</ul>
										</CardBlock>
									</Card>
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
							<h2>Recommended Shelters</h2>
							<CardDeck>
								<ShelterCard/>
								<ShelterCard/>
								<ShelterCard/>
							</CardDeck>
						</Container>
			</div>
		)
	}
}

window._ParkDetails = ParkDetails;
