import React, { Component } from 'react';
import { Card,
  CardBody, CardText,
  CardTitle } from 'reactstrap';

const ParkInfo = (props) => {
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle>Park Info</CardTitle>
          <ul className="fa-ul">
            <li><span className="fa-li"><i className="fas fa-paw"></i></span><b>Address:</b> {props.parkJSON.address} {props.parkJSON.city}, {props.parkJSON.state} {props.parkJSON.zip}</li>
            <li><span className="fa-li"><i className="fas fa-paw"></i></span><b>Phone:</b> Phone: {props.parkJSON.phone}</li>
            <li><span className="fa-li"><i className="fas fa-paw"></i></span><b>Yelp Rating:</b> {props.parkJSON.yelp_rating}</li>
          </ul>
        </CardBody>
      </Card>
    </div>
  );
};

export default ParkInfo;

window._ParkInfo = ParkInfo;
