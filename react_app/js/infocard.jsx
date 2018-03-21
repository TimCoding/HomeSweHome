import React, {Component} from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import * as urls from './urls.js';

const InfoCard = (props) => {
    var address;
    if (props.address == null) {
        address = props.city + ", " + props.state + " " + props.zip;
    } else {
        address = props.address;
    }

    return (
        <div>
            <Card>
                <CardBody>
                    <CardTitle>{props.center}</CardTitle>
                    <CardText>Address: {address}</CardText>
                    <CardText>Phone Number: {props.phone} </CardText>
                    <a className="btn btn-primary" href={urls.shelterURL(props.id)}>Adopt Me Please</a>
                   
                </CardBody>
            </Card>
        </div>
    );
};

export default InfoCard;

window._InfoCard = InfoCard