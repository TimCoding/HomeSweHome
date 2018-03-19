import React, { Component } from 'react';
import { Card,
         CardBody,
         CardTitle } from 'reactstrap';

const Reviews = (props) => {
 return (
   <div>
     <Card>
       <CardBody>
         <CardTitle>Customer Reviews</CardTitle>
         <span>Name: </span><br/>
         <span>Rating: </span><br/>
         <span>review goes here</span><br/>
       </CardBody>
     </Card>
   </div>
 );
};

export default Reviews;

window._Reviews = Reviews
