import React, {Component} from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';

const ParkCard = (props) => {
    return (
        <div className="cards">
            <Card>
                <CardImg src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" /*src={props.image_urls}*/ alt="Park image" />
                <CardBody>
                    <CardTitle>Park Name{/*props.name*/}</CardTitle>
                    <CardText>
							<ul className="fa-ul">
	                        <li><span className="fa-li"><i className="fas fa-paw"></i></span>rating {this.props.parkData.}</li>
	                        <li><span className="fa-li"><i className="fas fa-paw"></i></span>phone {this.props.parkData.}</li>
	                        <li><span className="fa-li"><i className="fas fa-paw"></i></span>location {this.props.parkData.}</li>
							</ul>
                    </CardText>
                    <Button>Visit</Button>
                </CardBody>
            </Card>
        </div>
    );
};

export default ParkCard;

window._ParkCard = ParkCard;
