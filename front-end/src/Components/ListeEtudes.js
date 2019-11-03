import React, {Component} from 'react';
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import Button from "react-bootstrap/Button";

export const Etude = (props) => (
    <div>
    <Card style={{ marginBottom: '1rem', width: '18rem' }}>
      <Card.Header>{props.name}</Card.Header>
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>Age : Entre {props.ageMin} ans et {props.ageMax} ans</Card.Text> 
          <Card.Text>Sexe : {props.sexe}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Date de début: {props.date}</small>
        </Card.Footer>
        <Button href={props.lien} variant="primary">
            En savoir plus
        </Button>
    </Card>
    </div>
)

export const ListeEtudes = (props) => {
    let etudes = props.filteredEtudes.map((etude) =>{
        return <Etude key ={etude.id} name={etude.name} title={etude.title} ageMin={etude.ageMin} ageMax={etude.ageMax} sexe={etude.sexe} date={etude.date} lien={etude.lien}/>
    })
    return (
        <div>
        <CardDeck>
            {etudes}
        </CardDeck> 
        </div>
    )
}