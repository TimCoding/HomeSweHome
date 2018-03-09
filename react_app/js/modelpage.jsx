import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import ReactDOM from 'react-dom';

export default class ModelPage extends Component {
	render(){
		//Use prop here to determine what type of data model page it should be
		return (
			<Container>
				<Row className="models_top">
					<Col md="8">
						<p className="models_content">HomeSweHome</p>
						<h3 className="models_content">Quote Here</h3>
					</Col>
					<Col md="4">
						<img className="logo" src="{{ url_for('static', filename='img/homeswehomelogo.svg') }}"/>
					</Col>
				</Row>
				<hr/>
				<Row className="models_top">
					//Insert cards here
				</Row>
			</Container>
		)
	}
}

window._ModelPage = ModelPage
