import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import {NavBar} from './navbar.jsx';
import InfoCard from './infocard.jsx';
import { ControlledCarousel } from './carousel.jsx';
import ParkCard from './parkcards.jsx';
import {CardDeck} from 'reactstrap';
import * as api from './api.js';

export default class DogDetails extends Component {
	constructor(props) {
		super(props);

		this.state = {
            dogJSON: null,
            shelterJSON: null,
            parkJSON: null,
            error: null
        }
	}

	componentDidMount() {
        api.fetchDog(this.props.dogID)
            .then(dogJSON => this.setState({
                dogJSON: dogJSON
            }))
            .catch(error => this.setState({
                error: "DAMN"
            }));

    }

	render() {

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

         if(this.state.dogJSON == null) {
            return (
                <div>
                    <NavBar/>
                    <Container>
                        <h1 className="text-center">Loading...</h1>
                    </Container>
                </div>
            );
        }
		return (
			<div>
				<NavBar/>
				<br/>
				<ControlledCarousel/>
				<br/>
				<Container>
					<Row className="description_box">
						<Col md="8">
							<h5>Description</h5>
							<p className="description_content">description goes here</p>
						</Col>
						<Col md="4">
							<InfoCard address = {this.state.dogJSON.address} city = {this.state.dogJSON.shelter.city} phone = {this.state.dogJSON.phone} />
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