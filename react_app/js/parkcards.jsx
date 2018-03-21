import React, {Component} from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';

const ParkCard = (props) => {
    return (
        <div className="cards">
            <Card>

                <CardImg top width="100%" src={props.parkData.image_urls[0]} alt="Card image cap" />
                <CardBody>
                    <CardTitle>{props.parkData.name}</CardTitle>
                    <CardText>
							<ul className="fa-ul">
    	                        <li><span className="fa-li"><i className="fas fa-paw"></i></span>Yelp Rating: {props.parkData.yelp_rating}</li>
    	                        <li><span className="fa-li"><i className="fas fa-paw"></i></span>Phone: {props.parkData.phone}</li>
    	                        <li><span className="fa-li"><i className="fas fa-paw"></i></span>
                                    Location: {props.parkData.address} {props.parkData.city}, {props.parkData.state} {props.parkData.zip}
                                </li>
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
