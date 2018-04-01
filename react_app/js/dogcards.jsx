import React, {Component} from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import * as urls from './urls.js';

const DogCard = (props) => {
  let dogBreed = props.dogData.breeds.map(type => {
    return (
      <li>{type}</li>
    );
  })

  return (
    <div className="cards">
      <Card>
        <CardImg className="cardImg"
                 src={props.dogData.image_urls.length > 0 ? props.dogData.image_urls[0] : "/static/img/homeswehomelogo.svg"}
                 alt="Dog image" />
        <div className="hoverText">
          <CardBody>
            <h4 className="dogCardName">{props.dogData.name}</h4>
            <CardText>
              <b>Breed: </b>
              <span className="dogCardBreed">{dogBreed}</span>
            </CardText>
            <CardText>
              <b>Housetrained: </b>
              <span className="dogCardHouseTrained">{props.dogData.housetrained === true ? "Yes" : "No"}</span>
            </CardText>
            <CardText>
              <b>Friendly: </b>
              <span className="dogCardFriendly">{props.dogData.friendly ? "Yes" : "No"}</span>
            </CardText>
            <a className="btn btn-primary" href={urls.dogURL(props.dogData.id)}>Meet {props.dogData.name}</a>
          </CardBody>
        </div>
      </Card>
    </div>
  );
};

export default DogCard;

window._DogCard = DogCard
