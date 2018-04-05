import React, {Component} from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import * as urls from './urls.js';

const InfoCard = (props) => {
    var address;
    if (props.address == null) {
        address = props.city + ", " + props.state + " " + props.zipcode;
    } else {
        address = props.address;
    }

    return (
        <div>
            <Card>
                {props.image_urls.length == 0 ? "" : <CardImg src={props.image_urls[0]} alt="Shelter Image"/>}
                <CardBody>
                    <CardTitle><p className="infoCardTitle">{props.name}</p></CardTitle>
                    <CardText>Address: <p className="infoCardAddress">{address}</p></CardText>
                    <CardText>Phone Number: <p className="infoCardPhone">{props.phone}</p></CardText>
                    <a className="btn btn-primary" href={urls.shelterURL(props.id)}>Visit this Shelter</a>
                   
                </CardBody>
            </Card>
        </div>
    );
};

export default InfoCard;

window._InfoCard = InfoCard