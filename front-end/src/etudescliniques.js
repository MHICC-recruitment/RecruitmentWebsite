import React from "react";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";

export const etudescliniques = () => (
  <div>
    <h2> Études cliniques</h2>
    <p>Voici les études cliniques en cours.</p>

    <CardDeck>
      <Card>
        <Card.Header>Diabète de type 2</Card.Header>
        <Card.Body>
          <Card.Title>Développement d'un nouveau médicament</Card.Title>
          <Card.Text>*Age: *Sexe: *Etc:</Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Date de début: 25 février 2019</small>
        </Card.Footer>
      </Card>
      <Card>
        <Card.Header>Scoliose</Card.Header>
        <Card.Body>
          <Card.Title>Développemen d'un nouveau traitement</Card.Title>
          <Card.Text>*Age *Sexe</Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Date de début:30 mars 2019</small>
        </Card.Footer>
      </Card>
      <Card>
        <Card.Header>Maladie rare</Card.Header>
        <Card.Body>
          <Card.Title>Développement d'une nouvelle méthode</Card.Title>
          <Card.Text>*Age *Sexe</Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">4 avril 2019</small>
        </Card.Footer>
      </Card>
    </CardDeck>
  </div>
);
