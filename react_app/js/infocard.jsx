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
                <CardBody>
                    <CardTitle><p className="infoCardTitle">{props.name}</p></CardTitle>
                    <CardText>Address: <p className="infoCardAddress">{address}</p></CardText>
                    <CardText>Phone Number: <p className="infoCardPhone">{props.phone}</p></CardText>
                    <a className="btn btn-primary" href={urls.shelterURL(props.id)}>Adopt Me Please</a>
                   
                </CardBody>
            </Card>
        </div>
    );
};

export default InfoCard;

window._InfoCard = InfoCard