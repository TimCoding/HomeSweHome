import React from 'react';
import {Container, Row, Col} from 'reactstrap';
import {PawSpinner} from './spinner.jsx';
import {NavBar} from './navbar.jsx';
import DogCard from './dogcards.jsx';
import ShelterCard from './sheltercards.jsx'
import ParkCard from './parkcards.jsx';

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
                    <NavBar/>
                    <Container>
                        <h1 className="text-center text-danger">{this.state.error}</h1>
                    </Container>
                </div>
            );
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

        /* Show Spinner */
        // if (this.state.dogsJSON == null || this.state.parksJSON == null || this.state.sheltersJSON == null) {
        //     return (
        //         <div>
        //             <NavBar/>
        //             <Container>
        //                 <h1 className="text-center" style={{fontSize: '6em'}}><PawSpinner/></h1>
        //             </Container>
        //         </div>
        //     );
        // }

        /* Create card lists */
        var dogList = [];
        var parkList = [];
        var shelterList = [];

        if(!(this.state.dogsJSON == null)) {
            dogList = this.state.dogsJSON.results.map(dog => {
                return (
                    <Col md="3">
                        <DogCard dogData={dog}/>
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
                        <ParkCard parkData={park}/>
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
                        <ShelterCard shelterData={shelter}/>
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


        return (
            <div>
                <NavBar/>
                <Container>
                    {dogStaticContent}
                    <Row> {dogList} </Row>
                    { this.state.dogsJSON == null ? <h1 className="text-center"><PawSpinner /></h1> : "" }
                </Container>
                <Container>
                    {shelterStaticContent}
                    <Row> {shelterList} </Row>
                    { this.state.sheltersJSON == null ? <h1 className="text-center"><PawSpinner /></h1> : "" }
                </Container>
                <Container>
                    {parkStaticContent}
                    <Row> {parkList} </Row>
                    { this.state.parksJSON == null ? <h1 className="text-center"><PawSpinner /></h1> : ""}
                </Container>
            </div>
        );
    }
}

window._Search = Search;