import React, { Component } from 'react';
import { Jumbotron,
				 Container, Col, Row,
				 Card, CardDeck, CardTitle, CardBody } from 'reactstrap';
import { NavBar } from './navbar.jsx';
import GoogleMap from './map.jsx';
import ParkInfo from './parkinfo.jsx';
import * as api from './api.js';
import {PawSpinner} from './spinner.jsx';
import DogCard from './dogcards.jsx';
import ShelterCard from './sheltercards.jsx';
import {GoogleApiWrapper} from 'google-maps-react';

export class ParkDetails extends Component{
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
		api.fetchParkNearby(this.props.parkID)
		.then(nearbyJSON => this.setState({
			shelterJSON: nearbyJSON["shelters"]
		}))
		.catch(error => this.setState({
			error: "DAMN"
		}));
		api.fetchParkNearby(this.props.parkID)
		.then(nearbyJSON => this.setState({
			dogJSON: nearbyJSON["dogs"]
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
						<h1 className="text-center" style={{fontSize: '6em'}}><PawSpinner className="PawSpinner" /></h1>
					</Container>
				</div>
			);
		}


		let shelterList = (
			<h1 className="text-center" style={{fontSize: '5em'}}><PawSpinner /></h1>
		);
		if(!(this.state.shelterJSON == null)){
			shelterList = this.state.shelterJSON.map(shelter => {
				return (
					<Col md="4">
						<ShelterCard shelterData={shelter}/>
					</Col>
				);
			})
		}

		let dogList = (
			<h1 className="text-center" style={{fontSize: '5em'}}><PawSpinner /></h1>
		);
		if(!(this.state.dogJSON == null)) {
			dogList = this.state.dogJSON.map(dog => {
				return (
					<Col md="4">
						<DogCard dogData={dog}/>
					</Col>
				);
			})
		}

	return (
		<div>
			<NavBar/>
			<Jumbotron style={{
					backgroundImage: 'url("' + this.state.parkJSON.image_urls[0] + '")',
					backgroundSize: "cover",
					minHeight:"400px"
				}}>
				<h1 className="text-center" style={{
						color: "white",
						textShadow: "0 0 5px #000, 0 0 5px #000"
					}}>{this.state.parkJSON.name}</h1>
				</Jumbotron>
				<Container>
					<Row>
						<Col md="8"
							style={{width: '100%', minHeight: '400px'}}>
							<GoogleMap
								initialCenter={{lat: this.state.parkJSON.latitude, lng: this.state.parkJSON.longitude}}
								marker={{lat: this.state.parkJSON.latitude, lng: this.state.parkJSON.longitude}}
          			zoom={17}

							/>
						</Col>
						<Col>
							<ParkInfo parkJSON={this.state.parkJSON}/>
						</Col>
					</Row>
					<br/>
				</Container>

				<hr></hr>

				<Container>
					<h2>Recommended Shelter</h2>
					<Row>
						{shelterList}
					</Row>
					<br/>
				</Container>

				<hr></hr>

				<Container>
					<h2>Recommended Dogs</h2>
					<Row>
						{dogList}
					</Row>
				</Container>

				<br/>
			</div>
		)
	}
}


window._ParkDetails = ParkDetails;
