import React, { Component } from 'react';
import { Card,
         CardBody,
         CardTitle } from 'reactstrap';

const Reviews = (props) => {
 return (
   <div>
     <Card>
       <CardBody>
         {/* <CardTitle>Customer Reviews</CardTitle> */}
         <CardTitle>About: </CardTitle>
         <span><b>Adoption Policy:</b> {props.desc.adoption_policy}</span><br/>
         <span><b>Mission:</b> {props.desc.mission} </span><br/>
         <span><b>Email:</b> {props.desc.email} </span><br/>
         {/* <span>review goes here</span><br/> */}
       </CardBody>
     </Card>
   </div>
 );
};

export default Reviews;

window._Reviews = Reviews
