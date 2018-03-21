import React, {Component} from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import * as urls from './urls.js';

const DogCard = (props) => {
    let dogBreed = props.dogData.breeds.map(type => {
        return (
            <ul>
           <li>{type}</li>
           </ul>
        );
    })
    return (
        <div className="cards">
            <Card>
                {/*style={{width:"10%", height:"10%"}}*/}
                <CardImg src={props.dogData.image_urls != "" ? props.dogData.image_urls : "/static/img/homeswehomelogo.svg"} alt="Dog image" />
                <CardBody>
                    {/* don't know if these props work properly need data to test */}
                    <CardTitle className="dogCardTitle">{props.dogData.name}</CardTitle>
                    <CardText>
                        <ul className="fa-ul">
                            <li><span className="fa-li"><i className="fas fa-paw"></i></span><b>Breed:</b> 
                                <p className="dogCardBreed">{dogBreed} </p>
                            </li>
                            <li><span className="fa-li"><i className="fas fa-paw"></i></span><b>Housetrained:</b>
                                <p className="dogCardHouseTraiend"> {props.dogData.housetrained === true ? "Yes" : "No"}</p>
                            </li>
                            <li><span className="fa-li"><i className="fas fa-paw"></i></span><b>Friendly:</b> 
                                <p className="dogCardFriendly"> {props.dogData.friendly === true ? "Yes" : "No"} </p>
                            </li>
                        </ul>
                    </CardText>
                    <a className="btn btn-primary" href={urls.dogURL(props.dogData.id)}>Meet {props.dogData.name}</a>
                </CardBody>
            </Card>
        </div>
    );
};

export default DogCard;

window._DogCard = DogCard
