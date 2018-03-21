import React, { Component } from 'react';
import { Jumbotron,
				 Container, Col, Row,
				 Card, CardDeck, CardTitle, CardBody } from 'reactstrap';
import { NavBar } from './navbar.jsx';
import Map from './map.jsx';
import ParkInfo from './parkinfo.jsx';
import * as api from './api.js';
import {PawSpinner} from './spinner.jsx';

	// import DogCard from './dogcards.jsx';
	// import ShelterCard from './sheltercards.jsx';

	export default class ParkDetails extends Component{
		constructor(props) {
			super(props);

			this.state = {
				parkJSON: null,
				error: null
			}
		}

		componentDidMount() {
			api.fetchPark(this.props.parkID)
			.then(parkJSON => this.setState({
				parkJSON: parkJSON
			}))
			.catch(error => this.setState({
				error: "DAMN"
			}));
		}

		render(){
			if(!(this.state.error == null)){
				return (
					<div>
						<NavBar/>
						<Container>
							<h1 className="text-center text-danger">{this.state.error}</h1>
						</Container>
					</div>
				);
			}
			if(this.state.parkJSON == null) {
				return (
					<div>
						<NavBar/>
						<Container>
							<h1 className="text-center" style={{fontSize: '6em'}}><PawSpinner /></h1>
						</Container>
					</div>
				);
			}
			return (
				<div>
					<NavBar/>
					<Jumbotron fluid>
						<img className="w-100" height="500" src={this.state.parkJSON.image_urls[0]}/>
						<h1>{this.state.parkJSON.name}</h1>
					</Jumbotron>
					<Container>
						<Row>
							<Col md="8">
								<Map isMarkerShown
									googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
									loadingElement={<div style={{ height: `100%` }} />}
									containerElement={<div style={{ height: `400px` }} />}
									mapElement={<div style={{ height: `100%` }} />}/>
							</Col>
							<Col md="4">
								<ParkInfo parkJSON={this.state.parkJSON}/>
							</Col>
						</Row>
					</Container>
					<br/>

					<Container>
						<Row>
							<Col>
								<Card>
									<CardBody>
										<CardTitle>Description {/*this.props.information*/}</CardTitle>
										<span>park description here {/*this.props.description*/}</span>
									</CardBody>
								</Card>
							</Col>
						</Row>
					</Container>

					<hr></hr>

					<Container>
						<h2>Recommended Dogs</h2>
					</Container>

					<hr></hr>

					<Container>
						<h2>Recommended Shelters</h2>
					</Container>
				</div>
			)
		}
	}

	window._ParkDetails = ParkDetails;
