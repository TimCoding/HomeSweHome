import React, {Component} from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';

const ShelterCard = (props) => {
    let img = "";
    if (props.shelterData.image_urls[0] == "") {
        img = "/static/img/homeswehomelogo.svg";
    } else {
        img = props.shelterData.image_urls[0]
    }
    return (
        <div className="cards">
            <Card>
                <CardImg top width="100%" src={img} alt="Card image cap" />
                <CardBody>
                    <CardTitle>{props.shelterData.name}</CardTitle>
                    <CardText>
                        <ul className="fa-ul">
                                <li><span className="fa-li"><i className="fas fa-paw"></i></span><b>Email:</b> {props.shelterData.email}</li>
                                <li><span className="fa-li"><i className="fas fa-paw"></i></span><b>Phone:</b>s {props.shelterData.phone}</li>
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
