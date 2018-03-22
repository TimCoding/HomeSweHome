import React, { Component } from 'react';
import { Card,
  CardBody, CardText,
  CardTitle } from 'reactstrap';

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
              <b>Phone:</b> {props.parkJSON.phone}
            </span><br/>
            <span >
              <b>Yelp Rating:</b> {props.parkJSON.yelp_rating}
            </span><br/>
        </CardBody>
      </Card>
    </div>
  );
};

export default ParkInfo;

window._ParkInfo = ParkInfo;
