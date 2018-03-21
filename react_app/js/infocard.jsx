import React, {Component} from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';

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
                    <CardTitle>Information</CardTitle>
                    <CardText>Address: {address}</CardText>
                    <CardText>Phone Number: {props.phone} </CardText>
                    <Button>Adopt Me Please</Button>
                </CardBody>
            </Card>
        </div>
    );
};

export default InfoCard;

window._InfoCard = InfoCard