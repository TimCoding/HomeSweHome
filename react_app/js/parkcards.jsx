import React, {Component} from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import * as urls from './urls.js';
import {StarsRating} from "./stars.jsx";

const ParkCard = (props) => {
    let img = "";
    if (props.parkData.image_urls[0] == "") {
        img = "/static/img/homeswehomelogo.svg";
    } else {
        img = props.parkData.image_urls[0]
    }
  return (
    <div className="cards">
      <Card>
        <CardImg className="cardImg" src={img} alt="Park image" />
        <span className="hoverText">
        <CardBody>
          <CardTitle className="parkCardTitle">{props.parkData.name}</CardTitle>

            <CardText>
              <b>Yelp Rating: </b>
              <StarsRating rating={props.parkData.yelp_rating} />
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
