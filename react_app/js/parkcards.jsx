import React, {Component} from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';

const ParkCard = (props) => {
    return (
        <div className="cards">
            <Card>
                <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" /*{this.props.image}*/ alt="Card image cap" />
                <CardBody>
                    <CardTitle>Park Name{/*props.name*/}</CardTitle>
                    <CardText>
											<ul className="fa-ul">
	                        <li><span className="fa-li"><i className="fas fa-paw"></i></span>rating {/*this.props.rating*/}</li>
	                        <li><span className="fa-li"><i className="fas fa-paw"></i></span>phone {/*props.phone*/}</li>
	                        <li><span className="fa-li"><i className="fas fa-paw"></i></span>location {/*props.location*/}</li>
											</ul>
                    </CardText>
                    <Button>Visit</Button>
                </CardBody>
            </Card>
        </div>
    );
};

export default ParkCard;

window._ParkCard = ParkCard;
