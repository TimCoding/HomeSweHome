import React, {Component} from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';

const DogCard = (props) => {
    return (
        <div>
            <Card>
                <CardImg top src={props.dogData.image_urls} alt="Card image cap" />
                <CardBody>
                    {/* don't know if these props work properly need data to test */}
                    <CardTitle>{props.dogData.name}</CardTitle>
                    <CardText>
                        <ul class="fa-ul">
                        <li><span className="fa-li"><i className="fas fa-paw"></i></span>Breed: {props.dogData.breeds}</li>
                        <li><span className="fa-li"><i className="fas fa-paw"></i></span>Housetrained: {props.dogData.housetrained}</li>
                        <li><span className="fa-li"><i className="fas fa-paw"></i></span>Friendly: {props.dogData.friendly}</li>
                        </ul>
                    </CardText>
                    <Button>Meet {props.dogData.name}</Button>
                </CardBody>
            </Card>
        </div>
    );
};

export default DogCard;

window._DogCard = DogCard
