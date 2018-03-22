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
         <span><b>Adoption Policy:</b></span><div dangerouslySetInnerHTML={{__html: props.desc.adoption_policy}}></div><br/>
         <span><b>Mission:</b></span> <div dangerouslySetInnerHTML={{__html: props.desc.mission}}></div><br/>
         <span><b>Email:</b> {props.desc.email} </span><br/>
         {/* <span>review goes here</span><br/> */}
       </CardBody>
     </Card>
   </div>
 );
};

export default Reviews;

window._Reviews = Reviews
