import React, { Component } from 'react';
import { Card,
         CardBody,
         CardTitle } from 'reactstrap';

const ParkInfo = (props) => {
 return (
   <div>
     <Card>
       <CardBody>
         <CardTitle>Info</CardTitle>
         <span>Address: {props.parkJSON.address}</span><br/>
          <span style="padding:5px">{props.parkJSON.city}, {props.parkJSON.state} {props.parkJSON.zip}</span><br/>
          <span>Phone: {props.parkJSON.phone}</span><br/>
         <span>Yelp Rating: {props.parkJSON.yelp_rating}</span><br/>
       </CardBody>
     </Card>
   </div>
 );
};

export default ParkInfo;

window._ParkInfo = ParkInfo;
