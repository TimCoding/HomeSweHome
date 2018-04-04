import React, {Component} from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import * as urls from './urls.js';
import {StarsRating} from "./stars.jsx";
import Highlighter from "react-highlight-words";

const ParkCard = (props) => {
    let img = "";
    if (props.parkData.image_urls.length == 0) {
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
          <CardTitle className="parkCardTitle">
              <Highlighter
                searchWords={[props.query]}
                textToHighlight={props.parkData.name}/>
          </CardTitle>
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
              <Highlighter
                searchWords={[props.query]}
                textToHighlight={props.parkData.address + " " + props.parkData.city + ", " + props.parkData.state + " " + props.parkData.zip}/>
            </span>
          </CardText>
          <a className="btn btn-primary" href={urls.parkURL(props.parkData.id)}>Visit</a>
        </CardBody>
      </span>
      </Card>
      <div hidden="true"> {/*This div is used for testing purposes*/}
        <p className="testQuery">{props.query}</p>
        <p className="testName">{props.parkData.name}</p>
        <p className="testAddress">{props.parkData.address + " " + props.parkData.city + ", " + props.parkData.state + " " + props.parkData.zip}</p>
        <p className="testPhone">{props.parkData.phone}</p>
        <p className="testRating">{props.parkData.yelp_rating}</p>
      </div>
    </div>
  );
};

export default ParkCard;

window._ParkCard = ParkCard;
