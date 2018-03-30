import React, {Component} from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import * as urls from './urls.js';

const DogCard = (props) => {
  let dogBreed = props.dogData.breeds.map(type => {
    return (
      <div>
        <li>{type}</li>
      </div>
    );
  })

  return (
    <div className="cards">
      <Card>
        <CardImg className="cardImg"
                 src={props.dogData.image_urls != "" ? props.dogData.image_urls : "/static/img/homeswehomelogo.svg"}
                 alt="Dog image" />
        <span className="hoverText">
          <CardBody>
            <h4 className="dogCardName">{props.dogData.name}</h4>
            <CardText>
              <div>
                <b>Breed: </b>
                <span className="dogCardBreed">{dogBreed}</span>
              </div>
              <div>
                <b>Housetrained: </b>
                <span className="dogCardHouseTrained">{props.dogData.housetrained === true ? "Yes" : "No"}</span>
              </div>
              <div>
                <b>Friendly: </b>
                <span className="dogCardFriendly">{props.dogData.friendly ? "Yes" : "No"}</span>
              </div>
            </CardText>
            <a className="btn btn-primary" href={urls.dogURL(props.dogData.id)}>Meet {props.dogData.name}</a>
          </CardBody>
        </span>
      </Card>
    </div>
  );
};

export default DogCard;

window._DogCard = DogCard
