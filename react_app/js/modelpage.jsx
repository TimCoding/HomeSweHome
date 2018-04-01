import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import ReactDOM from 'react-dom';
import {NavBar} from './navbar.jsx';
import * as api from './api.js';
import {PawSpinner} from './spinner.jsx';
import DogCard from './dogcards.jsx';
import ShelterCard from './sheltercards.jsx'
import ParkCard from './parkcards.jsx';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
 				 Form, FormGroup, Label, Input } from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

export default class ModelPage extends Component {
	constructor(props) {
		super(props);

		if(this.props.model === "dogs"){
			this.resultsPaginator = new api.Paginator(12, api.fetchDogs);
		} else if (this.props.model === "shelters") {
            this.resultsPaginator = new api.Paginator(12, api.fetchShelters);
		} else if (this.props.model === "parks") {
            this.resultsPaginator = new api.Paginator(12, api.fetchParks);
		}

		this.state = {
			results: null,
			resultsLoading: true,
			error: null,
			filterOpen: false,
			sortbyOpen: false,
		};

		this.toggleFilter = this.toggleFilter.bind(this);
		this.toggleSortby = this.toggleSortby.bind(this);
		this.clickLoadMore = this.clickLoadMore.bind(this);
		this.scrollHandle = this.scrollHandle.bind(this);
		// this.selectSortby = this.selectSortby.bind(this)
	}

	componentDidMount() {
        window.addEventListener('scroll', this.scrollHandle);
		this.resultsPaginator.fetchFirstPage()
			.then(results => this.setState({
				results: results,
				resultsLoading: false
			}))
			.catch(error => this.setState({
				error: error.message
			}));
	}

	componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollHandle);
	}

	toggleFilter() {
		this.setState({
			filterOpen: !this.state.filterOpen
		})
	}

	toggleSortby() {
		this.setState({
			sortbyOpen: !this.state.sortbyOpen
		})
	}

	clickLoadMore() {
		this.setState({
			resultsLoading: true
		});
        this.resultsPaginator.fetchNextPage()
            .then(results => this.setState({
                results: this.state.results.concat(results),
                resultsLoading: false
            }))
            .catch(error => this.setState({
                error: error.message
            }));
	}

	scrollHandle(event){
		if (this.state.resultsLoading || !this.resultsPaginator.hasNextPage()) {
			return;
		}
		// https://stackoverflow.com/questions/9439725/javascript-how-to-detect-if-browser-window-is-scrolled-to-bottom
        let scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        let scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;

        let scrolledToBottom = (scrollTop + window.innerHeight) >= scrollHeight;

        if (scrolledToBottom) {
        	this.clickLoadMore();
		}
	}

/*
	selectSortby() {
		this.setState({
			value: event.target.innerText
		});
	}
	*/

	renderFilterDropdown(options) {
		return (
			<Dropdown isOpen={this.state.filterOpen}
							  toggle={this.toggleFilter}
								style={{paddingRight: "10px"}}>
				<DropdownToggle caret>
					Filter
				</DropdownToggle>
				<DropdownMenu>
					<Col>
						{options}
					</Col>
				</DropdownMenu>
			</Dropdown>
		)
	}

	renderSortbyDropdown(options) {
		return (
			<Dropdown isOpen={this.state.sortbyOpen}
							  toggle={this.toggleSortby}>
				<DropdownToggle caret>
					Sort by
				</DropdownToggle>
				<DropdownMenu>
					{options}
				</DropdownMenu>
			</Dropdown>
		)
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

        let loadMore = [];
        if(this.state.resultsLoading){
            loadMore.push(
                <h1 className="text-center" style={{fontSize: '4.5em'}}><PawSpinner/></h1>
            );
        }
        if(this.resultsPaginator.hasNextPage()){
            loadMore.push(
                <h1 className="text-center">
                    <a href="javascript:undefined" onClick={this.clickLoadMore}>
                        <FontAwesomeIcon icon="angle-down"/>
                    </a>
                </h1>
            );
        }


		if (this.props.model === 'dogs') {
			const staticContent = (
				<div>
					<NavBar/>
					<Container>
						<Row className="models_top">
							<Col md="8">
								<p className="models_content">We at HomeSweHome believe that every dog deserves a home with a loving family.
									We also know that every dog has the potential to be a fine addition to any family. Browse through
									our list of adoptable dogs today and find a new family member. Our dogs come in all shapes and sizes, but each
									and every one of them have a huge heart made just for loving you! So stay awhile and help one of our good
									doggies find their Home Sweet Home.</p>
								<h3 className="models_content">"Dogs are not our whole life, but they make our lives whole." -Roger Caras</h3>
							</Col>
							<Col md="4">
								<img className="logo" src="/static/img/homeswehomelogo.svg"/>
							</Col>
						</Row>
					</Container>
				</div>
			);

			if(this.state.results == null) {
				return (
					<div>
						{staticContent}
						<Container>
							<h1 className="text-center" style={{fontSize: '6em'}}><PawSpinner /></h1>
						</Container>
					</div>
				);
			}

			let dogList = this.state.results.map(dog => {
				return (
					<Col md="3">
						<DogCard dogData={dog}/>
					</Col>
				);
			});

			let sortOptions = ["Name"].map(option => {
				return (
					<DropdownItem>{option}</DropdownItem>
				)
			});

			let filterOptions = ["breed1", "breed2", "breed3"].map(breed => {
				return (
					<FormGroup check>
						<Label check>
							<Input type="checkbox"/>
							 {' '}{breed}
						</Label>
					</FormGroup>
				)
			});

			return (
				<div>
					{staticContent}
					<Container>

						<h2>Dogs</h2>
						<br/>
						<Row>
							{this.renderFilterDropdown(filterOptions)}
							{this.renderSortbyDropdown(sortOptions)}
						</Row><br/>
						<Row>
							{dogList}
						</Row>
						{loadMore}
					</Container>
				</div>
			);
		}

		if (this.props.model === 'parks') {
			const staticContent = (
				<div>
					<NavBar/>
					<Container>
						<Row className="models_top">
							<Col md="8">
								<p className="models_content">There is no place like the great outdoors to make memories!
									Luckily for you we compiled a list of all the parks we think are cool. All you have to do is focus on spending
									time with your favorite four-legged buddy. Here is a selection of all parks that we
									recommend. You will find shelters and dogs in need of an adoption near each park you look at.
									Please look around and plan your first puppy date today!</p>
								<h3 className="models_content"> "It is amazing how much love and laughter they bring into our lives and even how much closer
									we become with each other because of them." – John Grogan
								</h3>
							</Col>
							<Col md="4">
								<img className="logo" src="/static/img/homeswehomelogo.svg"/>
							</Col>
						</Row>
					</Container>
				</div>
			);

			if(this.state.results == null) {
				return (
					<div>
						{staticContent}
						<Container>
							<h1 className="text-center" style={{fontSize: '6em'}}><PawSpinner /></h1>
						</Container>
					</div>
				);
			}

			let parkList = this.state.results.map(park => {
				return (
					<Col md="3">
						<ParkCard parkData={park}/>
					</Col>
				);
			});

			let sortOptions = ["Name", "Rating"].map(option => {
				return (
					<DropdownItem>{option}</DropdownItem>
				)
			});

			let filterOptions = ["> 4 stars", "> 3 stars", "> 2 stars", "City"].map(filter => {
				return (
					<FormGroup check>
						<Label check>
							<Input type="checkbox"/>
							 {' '}{filter}
						</Label>
					</FormGroup>
				)
			});

			return (
				<div>
					{staticContent}
					<hr></hr>
					<Container>
						<h2>Parks</h2>
							<Row>
								{this.renderFilterDropdown(filterOptions)}
								{this.renderSortbyDropdown(sortOptions)}
							</Row><br/>
						<Row>
							{parkList}
						</Row>
						{loadMore}
					</Container>
				</div>
			);
		}

		if (this.props.model === 'shelters') {
			const staticContent = (
				<div>
					<NavBar/>
					<Container>
						<Row className="models_top">
							<Col md="8">
								<p className="models_content">Here you can browse a variety of adoption centers or animal shelters around Texas. Take a look around, your new best friend is waiting!</p>
								<h3 className="models_content">"Dogs are great. Why stop at one? Get two, or three, or four. Just get the whole damn
									shelter. Wouldn't you agree?" -Timothy Ho
								</h3>
							</Col>
							<Col md="4">
								<img className="logo" src="/static/img/homeswehomelogo.svg"/>
							</Col>
						</Row>
					</Container>
				</div>
			);

			if(this.state.results == null) {
				return (
					<div>
						{staticContent}
						<Container>
							<h1 className="text-center" style={{fontSize: '6em'}}><PawSpinner /></h1>
						</Container>
					</div>
				);
			}

			let shelterList = this.state.results.map(shelter => {
				return (
					<Col md="3">
						<ShelterCard shelterData={shelter}/>
					</Col>
				);
			});

			let sortOptions = ["Name"].map(option => {
				return (
					<DropdownItem>{option}</DropdownItem>
				)
			});

			let filterOptions = ["Radius", "City"].map(filter => {
				return (
					<FormGroup check>
						<Label check>
							<Input type="checkbox"/>
							 {' '}{filter}
						</Label>
					</FormGroup>
				)
			});

			return (
				<div>
					{staticContent}
					<Container>
						<h2>Shelters</h2>
						<Row>
							{this.renderFilterDropdown(filterOptions)}
							{this.renderSortbyDropdown(sortOptions)}
						</Row><br/>
						<Row>
							{shelterList}
						</Row>
						{loadMore}
					</Container>
				</div>
			);
		}

	}
}

window._ModelPage = ModelPage;
