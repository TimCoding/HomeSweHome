import React, {Component} from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import * as urls from './urls.js';

const ParkCard = (props) => {
    return (
        <div className="cards">
            <Card>
                <CardImg top width="100%" src={props.parkData.image_urls[0]} alt="Park image" />
                <CardBody>
                    <CardTitle>{props.parkData.name}</CardTitle>
                    <CardText>
							<ul className="fa-ul">
    	                        <li><span className="fa-li"><i className="fas fa-paw"></i></span><b>Yelp Rating:</b> {props.parkData.yelp_rating}</li>
    	                        <li><span className="fa-li"><i className="fas fa-paw"></i></span><b>Phone:</b> {props.parkData.phone}</li>
    	                        <li><span className="fa-li"><i className="fas fa-paw"></i></span>
                                    <b>Location:</b> {props.parkData.address} {props.parkData.city}, {props.parkData.state} {props.parkData.zip}
                                </li>
							</ul>
                    </CardText>
                    <a className="btn btn-primary" href={urls.parkURL(props.parkData.id)}>Visit</a>
                </CardBody>
            </Card>
        </div>
    );
};

export default ParkCard;

window._ParkCard = ParkCard;
