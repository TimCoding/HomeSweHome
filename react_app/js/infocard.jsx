import React, {Component} from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';

const InfoCard = (props) => {

    return (
        <div>
            <Card>
                <CardBody>
                    <CardTitle>Information</CardTitle>
                    <CardText>Address: {props.address}</CardText>
                    <CardText>Phone Number: {props.phone_number}</CardText>
                    <Button>Adopt Me Please</Button>
                </CardBody>
            </Card>
        </div>
    );
};

export default InfoCard;

window._InfoCard = InfoCard