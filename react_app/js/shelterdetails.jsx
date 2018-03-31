import {NavBar} from './navbar.jsx';
import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';
import {CardDeck} from 'reactstrap';
import ShelterContact from './sheltercontact.jsx';
import GoogleMap from './map.jsx';
import ShelterHours from './shelterhours.jsx';
import ShelterInfo from './shelterinfo.jsx';
import ParkCard from './parkcards.jsx';
import DogCard from './dogcards.jsx';
import {PawSpinner} from './spinner.jsx';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import * as api from './api.js';


export class ShelterDetails extends Component {
    constructor(props) {
        super(props);

        this.dogPaginator = new api.Paginator(8, api.fetchShelterDogs, this.props.shelterID);

        this.state = {
            shelterJSON: null,
            error: null,
            dogs: [],
            loadingDogs: true
        };

        this.clickLoadMoreDog = this.clickLoadMoreDog.bind(this);
    }

    clickLoadMoreDog(){
        this.setState({
            loadingDogs: true
        });
        this.dogPaginator.fetchNextPage()
            .then(dogsJSON => this.setState({
                dogs: this.state.dogs.concat(dogsJSON),
                loadingDogs: false
            }))
            .catch(error => this.setState({
                error: error.message
            }));
    }

    componentDidMount() {
        api.fetchShelter(this.props.shelterID)
            .then(shelterJSON => this.setState({
                shelterJSON: shelterJSON
            }))
            .catch(error => this.setState({
                error: error.message
            }));
        this.dogPaginator.fetchFirstPage()
            .then(dogsJSON => this.setState({
                dogs: this.state.dogs.concat(dogsJSON),
                loadingDogs: false
            }))
            .catch(error => this.setState({
                error: error.message
            }));
        api.fetchShelterNearby(this.props.shelterID)
            .then(nearbyJSON => this.setState({
                parkJSON: nearbyJSON["parks"]
            }))
            .catch(error => this.setState({
                error: error.message
            }));
    }

    render() {
        if (!(this.state.error == null)) {
            return (
                <div>
                    <NavBar/>
                    <Container>
                        <h1 className="text-center text-danger">{this.state.error}</h1>
                    </Container>
                </div>
            );
        }
        if (this.state.shelterJSON == null) {
            return (
                <div>
                    <NavBar/>
                    <Container>
                        <h1 className="text-center" style={{fontSize: '6em'}}><PawSpinner/></h1>
                    </Container>
                </div>
            );
        }
        let dogList = this.state.dogs.map(dogi => {
            return (
                <Col md="3">
                    <DogCard dogData={dogi}/>
                </Col>
            );
        });
        let parkList = (
            <h1 className="text-center"><PawSpinner/></h1>
        );

        if (!(this.state.parkJSON == null)) {
            parkList = this.state.parkJSON.map(park => {
                return (
                    <Col md="3">
                        <ParkCard parkData={park}/>
                    </Col>
                );
            })
        }

        let nextButton = null;
        if(this.dogPaginator.hasNextPage()){
            nextButton = (
                <h1 className="text-center">
                    <a href="javascript:undefined" onClick={this.clickLoadMoreDog}>
                        <FontAwesomeIcon icon="angle-down"/>
                    </a>
                </h1>
            );
        }

        return (
            <div>
                <NavBar/>
                <br/>
                <ShelterContact shelterJSON={this.state.shelterJSON}/>
                {/*<ShelterInfo/>*/}
                <Container>
                    <Row>
                        <Col md="8"
                             style={{width: '100%', height: '400px'}}>
                            <GoogleMap
                                initialCenter={{
                                    lat: this.state.shelterJSON.latitude,
                                    lng: this.state.shelterJSON.longitude
                                }}
                                marker={{lat: this.state.shelterJSON.latitude, lng: this.state.shelterJSON.longitude}}
                                zoom={17}
                            />
                        </Col>
                        <Col md="4">
                            {/* <ShelterHours/> */}
                        </Col>
                    </Row>
                </Container>
                <br/>

                <Container>
                    <Row>
                        <Col>
                            <ShelterInfo desc={this.state.shelterJSON}/>
                        </Col>
                    </Row>
                </Container>
                <br/>

                <hr></hr>

                <Container>
                    <h2>Dogs in {this.state.shelterJSON.name}</h2>
                    <Row>
                        {dogList}
                    </Row>
                    { this.state.loadingDogs ? <h1 className="text-center"><PawSpinner/></h1> : "" }
                    {nextButton}
                </Container>
                <br/>

                <hr></hr>

                <Container>
                    <h2>Nearby Parks</h2>
                    <CardDeck>
                        <Row>
                            {parkList}
                        </Row>
                    </CardDeck>
                </Container>
                <br/>
            </div>
        )
    }
}

window._ShelterDetails = ShelterDetails;
