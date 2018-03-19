import React, { Component } from 'react';
import { Card,
         CardBody,
         CardTitle } from 'reactstrap';

const ShelterHours = (props) => {
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle>Business Hours</CardTitle>
          <span>Monday: </span><br/>
          <span>Tuesday: </span><br/>
          <span>Wednesday: </span><br/>
          <span>Thursday: </span><br/>
          <span>Friday: </span><br/>
          <span>Saturday: </span><br/>
          <span>Sunday: </span><br/>
        </CardBody>
      </Card>
    </div>
  );
};

export default ShelterHours;

window._ShelterHours = ShelterHours
