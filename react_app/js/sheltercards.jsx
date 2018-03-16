import React, {Component} from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';

const ShelterCard = (props) => {
    return (
        <div>
            <Card>
                <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                <CardBody>
                    <CardTitle>Shelter Name{/*this.props.name*/}</CardTitle>
                    <CardText>
                        <li>rating {/*this.props.rating*/}</li>
                        <li>phone {/*this.props.phone*/}</li>
                        <li>hours {/*this.props.hours*/}</li>
                    </CardText>
                    <Button>Adopt</Button>
                </CardBody>
            </Card>
        </div>
    );
};

export default ShelterCard;

window._ShelterCard = ShelterCard