import React, {Component} from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';

const ShelterCard = (props) => {
    return (
        <div className="cards">
            <Card>
                <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                <CardBody>
                    <CardTitle>Shelter Name{/*this.props.name*/}</CardTitle>
                    <CardText>
                        <ul class="fa-ul">
                                <li><span className="fa-li"><i className="fas fa-paw"></i></span>rating {this.props.shelterData.address}</li>
                                <li><span className="fa-li"><i className="fas fa-paw"></i></span>phone {this.props.phone}</li>
                                <li><span className="fa-li"><i className="fas fa-paw"></i></span>hours {this.props.shelterData.name}</li>
                        </ul>
                    </CardText>
                    <Button>Adopt</Button>
                </CardBody>
            </Card>
        </div>
    );
};

export default ShelterCard;

window._ShelterCard = ShelterCard
