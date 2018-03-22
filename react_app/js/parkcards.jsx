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
                    <CardTitle><p className="parkCardTitle">{props.parkData.name}</p></CardTitle>
                    <CardText>
							<ul className="fa-ul">
    	                        <li><span className="fa-li"><i className="fas fa-paw"></i></span><b>Yelp Rating: </b>
                                    <p className="parkCardRating">{props.parkData.yelp_rating}</p>
                                </li>
                                <li><span className="fa-li"><i className="fas fa-paw"></i></span><b>Phone: </b>
                                    <p className="parkCardPhone">{props.parkData.phone}</p>
                                </li>
    	                        <li><span className="fa-li"><i className="fas fa-paw"></i></span><b>Location: </b> 
                                    <p className="parkCardLocation">
                                        {props.parkData.address} {props.parkData.city}, {props.parkData.state} {props.parkData.zip} 
                                    </p>
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
