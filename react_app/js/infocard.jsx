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
                    <CardText>Address: </CardText>
                    <CardText>Phone Number: </CardText>
                    <Button>Adopt Me Please</Button>
                </CardBody>
            </Card>
        </div>
    );
};

export default InfoCard;

window._InfoCard = InfoCard