import React, { Component } from 'react';
import { Card,
  CardBody, CardText,
  CardTitle } from 'reactstrap';
import {StarsRating} from './stars';
import * as urls from './urls.js';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

const ParkInfo = (props) => {
  return (
    <div style={{paddingLeft:"40px"}}>
      <Card>
        <CardBody>
          <CardTitle><i className="fas fa-paw"/> Park Info <i className="fas fa-paw"/></CardTitle>
            <span >
              <b>Address:</b> {props.parkJSON.address}
            </span><br/>
            <span style={{marginLeft:"4em"}}>
               {props.parkJSON.city}, {props.parkJSON.state} {props.parkJSON.zip}
            </span><br/>
            <span >
              <b>Phone:</b> {props.parkJSON.phone == "" ? "N/A" : props.parksJSON.phone}
            </span><br/>
            <span >
              <b>Yelp Rating:</b> <StarsRating rating={props.parkJSON.yelp_rating} />
            </span><br/>
            <br/>
            <a href={urls.yelpParkURL(props.parkJSON.yelp_id)}
               className="btn btn-outline-danger"><FontAwesomeIcon icon={["fab", "yelp"]}/> Visit this park on Yelp!</a>
        </CardBody>
      </Card>
    </div>
  );
};

export default ParkInfo;

window._ParkInfo = ParkInfo;
