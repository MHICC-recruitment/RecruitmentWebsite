import React, {Component} from 'react';
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";

export const Etude = (props) => (
    <div>
    <Card >
      <Card.Header>{props.name}</Card.Header>
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>Age : {props.age} ans</Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Date de début: {props.date}</small>
        </Card.Footer>
    </Card>
    </div>
)

export const ListeEtudes = (props) => {
    let etudes = props.filteredEtudes.map((etude,i) =>{
        return <Etude key ={i} name={etude.name} title={etude.title} age={etude.age} date={etude.date} />
    })
    return (
        <div>
        <CardDeck>
            {etudes}
        </CardDeck> 
        </div>
    )
}