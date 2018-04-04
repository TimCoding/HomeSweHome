import React, {Component} from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import * as urls from './urls.js';
import Highlighter from "react-highlight-words";


const DogCard = (props) => {
  let dogBreed = props.dogData.breeds.map(type => {
    return (
      <li>
          <Highlighter
            searchWords={[props.query]}
            textToHighlight={type}/>
      </li>
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
            <h4>
                <Highlighter className="dogCardName"
                  searchWords={[props.query]}
                  textToHighlight={props.dogData.name}/>
            </h4>
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
      <div hidden="true"> {/*This div is used for testing purposes*/}
        <p className="testQuery">{props.query}</p>
        <p className="testName">{props.dogData.name}</p>
        <p className="testHouseTrained">{props.dogData.housetrained}</p>
        <p className="testFriendly">{props.dogData.friendly}</p>
      </div>
    </div>
  );
};

export default DogCard;

window._DogCard = DogCard
