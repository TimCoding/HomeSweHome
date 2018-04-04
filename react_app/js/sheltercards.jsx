import React, {Component} from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import * as urls from './urls.js';
import {Col} from 'reactstrap';
import Highlighter from "react-highlight-words";

const ShelterCard = (props) => {
  let img = "";
  if (props.shelterData.image_urls.length == 0) {
    img = "/static/img/homeswehomelogo.svg";
  } else {
    img = props.shelterData.image_urls[0]
  }

  return (
    <div className="cards">
      <Card>
        <CardImg className="cardImg" src={img} alt="Card image cap" />
        <div className="hoverText">
        <CardBody>
          <CardTitle className="shelterCardsTitle">
              <Highlighter
                searchWords={[props.query]}
                textToHighlight={props.shelterData.name}/>
          </CardTitle>
          <CardText>
            <i className="fas fa-paw"></i><b>Email: </b>
            <span className="shelterCardEmail">{props.shelterData.email}</span>
          </CardText>
          <CardText>
            <i className="fas fa-paw"></i><b>Phone: </b>
            <span className="shelterCardPhone">{props.shelterData.phone == "" ? "N/A" : props.shelterData.phone}</span>
          </CardText>
          <a className="btn btn-primary" href={urls.shelterURL(props.shelterData.id)}>Visit</a>
          </CardBody>
        </div>
      </Card>
      <div hidden="true"> {/*This div is used for testing purposes*/}
        <p className="testQuery">{props.query}</p>
        <p className="testName">{props.shelterData.name}</p>
        <p className="testEmail">{props.shelterData.email}</p>
        <p className="testPhone">{props.shelterData.phone}</p>
      </div>
    </div>
  );
};

export default ShelterCard;

window._ShelterCard = ShelterCard
