import React from 'react';
import {Container, Row, Col} from 'reactstrap';
import {PawSpinner} from './spinner.jsx';
import {NavBar} from './navbar.jsx';
import DogCard from './dogcards.jsx';
import ShelterCard from './sheltercards.jsx';
import ParkCard from './parkcards.jsx';
import ModelPagination from './modelPagination.jsx';

import * as api from './api.js';

class Search extends React.Component {
    constructor(props) {
        {
            super(props);
            this.state = {
                dogsJSON: null,
                error: null,
                sheltersJSON: null,
                parksJSON: null
            }
        }
    }

    componentDidMount() {
        /* do api calls here */
        api.fetchDogsSearchFull(this.props.query)
            .then(dogsJSON => this.setState({
                dogsJSON: dogsJSON
            }))
            .catch(error => this.setState({
                error: error.message
            }));

        api.fetchSheltersSearchFull(this.props.query)
            .then(sheltersJSON => this.setState({
                sheltersJSON: sheltersJSON
            }))
            .catch(error => this.setState({
                error: error.message
            }));

        api.fetchParksSearchFull(this.props.query)
            .then(parksJSON => this.setState({
                parksJSON: parksJSON
            }))
            .catch(error => this.setState({
                error: error.message
            }));
    }

    render() {
        /* Check for errors */
        if (!(this.state.error == null)) {
            return (
                <div>
                    <NavBar default_query={this.props.query}/>
                    <Container>
                        <h1 className="text-center text-danger">{this.state.error}</h1>
                    </Container>
                </div>
            );
        }

        /* Create card lists */
        var dogList = [];
        var parkList = [];
        var shelterList = [];

        if(!(this.state.dogsJSON == null)) {
            dogList = this.state.dogsJSON.results.map(dog => {
                return (
                    <Col md="3">
                        <DogCard dogData={dog} query={this.props.query}/>
                    </Col>
                );
            });
            if (this.state.dogsJSON.total == 0) {
                dogList = (
                    <Col md="12">
                        <p> No Results </p>
                    </Col>
                );
            }
        }

        if(!(this.state.parksJSON == null)) {
            parkList = this.state.parksJSON.results.map(park => {
                return (
                    <Col md="3">
                        <ParkCard parkData={park} query={this.props.query}/>
                    </Col>
                );
            });
            if (this.state.parksJSON.total == 0) {
                parkList = (
                    <Col md="12">
                        <p> No Results </p>
                    </Col>
                );
            }
        }

        if(!(this.state.sheltersJSON == null)) {
            shelterList = this.state.sheltersJSON.results.map(shelter => {
                return (
                    <Col md="3">
                        <ShelterCard shelterData={shelter} query={this.props.query}/>
                    </Col>
                );
            });
            if (this.state.sheltersJSON.total == 0) {
                shelterList = (
                    <Col md="12">
                        <p> No Results </p>
                    </Col>
                );
            }
        }

        /* Create static content */
        var dogStaticContent = (
            <Row>
                <Col md="12">
                    <h2> Dog Results </h2>
                </Col>
            </Row>
        );

        var shelterStaticContent = (
            <Row>
                <Col md="12">
                    <h2> Shelter Results </h2>
                </Col>
            </Row>
        );

        var parkStaticContent = (
            <Row>
                <Col md="12">
                    <h2> Park Results </h2>
                </Col>
            </Row>
        );

        return (
            <div>
            <NavBar default_query={this.props.query}/>
                <Container>
                    <h1>Results for "{this.props.query}"</h1>
                    <hr/>
                </Container>
            <Container>
                {dogStaticContent}
                <ModelPagination type="dog" call={api.fetchDogsSearchFull} query={this.props.query}/>
            </Container>
            <Container>
                {shelterStaticContent}
                <ModelPagination type="shelter" call={api.fetchSheltersSearchFull} query={this.props.query}/>
            </Container>
            <Container>
                {parkStaticContent}
                <ModelPagination type="park" call={api.fetchParksSearchFull} query={this.props.query}/>
            </Container>
        </div>
        );
    }
}

window._Search = Search;