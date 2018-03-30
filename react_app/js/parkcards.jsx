import React, {Component} from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import * as urls from './urls.js';

const ParkCard = (props) => {
  return (
    <div className="cards">
      <Card>
        <CardImg className="cardImg" src={props.parkData.image_urls[0]} alt="Park image" />
        <span className="hoverText">
        <CardBody>
          <CardTitle className="parkCardTitle">{props.parkData.name}</CardTitle>

            <CardText>
              <b>Yelp Rating: </b>
              <span className="parkCardRating">{props.parkData.yelp_rating}</span>
            </CardText>
            <CardText>
              <b>Phone: </b>
              <span className="parkCardPhone">{props.parkData.phone == "" ? "N/A" : props.parkData.phone}</span>
            </CardText>
            <CardText>
              <b>Location: </b>
              <span className="parkCardLocation">
                {props.parkData.address} {props.parkData.city}, {props.parkData.state} {props.parkData.zip}
              </span>
            </CardText>
          <a className="btn btn-primary" href={urls.parkURL(props.parkData.id)}>Visit</a>
        </CardBody>
      </span>
      </Card>
    </div>
  );
};

export default ParkCard;

window._ParkCard = ParkCard;
