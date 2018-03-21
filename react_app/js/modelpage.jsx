import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import ReactDOM from 'react-dom';
import {NavBar} from './navbar.jsx';

export default class ModelPage extends Component {
	render(){
		//Use prop here to determine what type of data model page it should be
		if (this.props.model == 'dogs') {
			return (
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
							<img className="logo" src="/static/img/homeswehomelogo.png"/>
						</Col>
					</Row>
				</Container>
			</div>
			);
		} 

		if (this.props.model == 'parks') {
			return (
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
							<img className="logo" src="/static/img/homeswehomelogo.png"/>
						</Col>
					</Row>
				</Container>
			</div>
			);
		}

		if (this.props.model == 'shelters') {
			return (
				<div>
				<NavBar/>
				<Container>
					<Row className="models_top">
						<Col md="8">
							<p className="models_content">Here you can browse a variety of adoption centers or animal shelters around Texas.</p>
							<h3 className="models_content">"Dogs are great. Why stop at one? Get two, or three, or four. Just get the whole damn 
								shelter. Wouldn't you agree?" -Timothy Ho
							</h3>
						</Col>
						<Col md="4">
							<img className="logo" src="/static/img/homeswehomelogo.png"/>
						</Col>
					</Row>
				</Container>
			</div>
			);
		}

	}
}

window._ModelPage = ModelPage
