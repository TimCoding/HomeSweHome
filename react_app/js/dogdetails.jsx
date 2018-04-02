import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import {NavBar} from './navbar.jsx';
import InfoCard from './infocard.jsx';
import { ControlledCarousel } from './carousel.jsx';
import ParkCard from './parkcards.jsx';
import {CardDeck, CardTitle, CardText, Card, CardBody, Table} from 'reactstrap';
import * as api from './api.js';
import {PawSpinner} from './spinner.jsx';

export default class DogDetails extends Component {
	constructor(props) {
		super(props);

		this.state = {
            dogJSON: null,
            error: null,
        }
	}

	componentDidMount() {
        api.fetchDog(this.props.dogID)
            .then(dogJSON => this.setState({
                dogJSON: dogJSON
            }))
            .catch(error => this.setState({
                error: error.message
            }));
		api.fetchDogNearby(this.props.dogID)
            .then(nearbyJSON => this.setState({
                parkJSON: nearbyJSON["parks"]
            }))
            .catch(error => this.setState({
                error: error.message
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
                        <h1 className="text-center" style={{fontSize: '6em'}}><PawSpinner /></h1>
                    </Container>
                </div>
            );
        }

		let parkList = (
            <h1 className="text-center" style={{fontSize: '6em'}}><PawSpinner /></h1>
        );
        if(!(this.state.parkJSON == null)){
         parkList = this.state.parkJSON.map(park => {
            return (
                <Col md="4">
                    <ParkCard parkData={park}/>
                </Col>
            );
        })}
        let items = [];
        for(let i = 0; i < this.state.dogJSON.image_urls.length; i++){
        	items.push({
				src: this.state.dogJSON.image_urls[i]
			});
		}

		const logo = [
			{
				src: "/../../static/img/homeswehomelogo.svg"
			}
		];
        let tableBody = [];
        tableBody.push(<tr>
            <th rowSpan={this.state.dogJSON.breeds.length}>Breeds</th>
            <td>{this.state.dogJSON.breeds[0]}</td>
        </tr>);
        for(let i = 1; i < this.state.dogJSON.breeds.length; i++) {
            tableBody.push(<tr>
                <td>{this.state.dogJSON.breeds[i]}</td>
            </tr>);
        }
		tableBody.push(<tr>
			<th>Altered (Spayed/Neutered)</th>
			<td>{this.state.dogJSON.altered ? "Yes" : "No"}</td>
		</tr>);
        tableBody.push(<tr>
            <th>Has Shots</th>
            <td>{this.state.dogJSON.shots ? "Yes" : "No"}</td>
        </tr>);
        tableBody.push(<tr>
            <th>House Trained</th>
            <td>{this.state.dogJSON.housetrained ? "Yes" : "No"}</td>
        </tr>);
		tableBody.push(<tr>
			<th>Friendly</th>
			<td>{this.state.dogJSON.friendly ? "Yes" : "No"}</td>
		</tr>);
        tableBody.push(<tr>
            <th>Special Needs</th>
            <td>{this.state.dogJSON.special_needs ? "Yes" : "No"}</td>
        </tr>);


		return (
			<div>
				<NavBar/>
				<br/>
				{/* might need to change this in controlled carousel */}
				<div id="dogCarousel">
                    <ControlledCarousel items={this.state.dogJSON.image_urls.length > 0 ? items : logo} size={"d-block mx-auto"} style={{height:500}}/>
				</div>
				<br/>
				<Container>
					<Row className="description_box">
						<Col md="8">
							<Card>
								<CardBody>
                                    <CardTitle>
                                        <h2>{this.state.dogJSON.name}</h2>
                                    </CardTitle>
                                    <CardText>
										<h5>Description:</h5>
                                        <p className="description_content">{this.state.dogJSON.description}</p>
                                        <h5>Information:</h5>
										<Table size="sm">
											<tbody>
											{tableBody}
											</tbody>
										</Table>
                                    </CardText>
								</CardBody>
							</Card>
						</Col>
						<Col md="4">
							<InfoCard {...this.state.dogJSON.shelter} />
						</Col>
					</Row>
				</Container>
				<Container>
				<h2>Nearby Parks</h2>
					<CardDeck>
						<Row>
							{parkList}
						</Row>
					</CardDeck>
				</Container>
			</div>
		);
	}
}

window._DogDetails = DogDetails;
