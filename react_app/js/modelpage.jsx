import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import ReactDOM from 'react-dom';
import {NavBar} from './navbar.jsx';

export default class ModelPage extends Component {
	render(){
		//Use prop here to determine what type of data model page it should be
		return (
			<div>
				<NavBar/>
				<Container>
					<Row className="models_top">
						<Col md="8">
							<p className="models_content">HomeSweHome</p>
							<h3 className="models_content">Quote Here</h3>
						</Col>
						<Col md="4">
							<img className="logo" src="/static/img/homeswehomelogo.png"/>
						</Col>
					</Row>
				</Container>
			</div>
		)
	}
}

window._ModelPage = ModelPage
