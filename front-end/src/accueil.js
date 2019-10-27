import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export const accueil = () => (
  <div>
    <h2> MHICC - Recrutement pour études cliniques</h2>
    <p>Bienvenue sur le site de recrutement du MHICC!</p>
    <br />
    <Card className="text-center" bg="dark" text="white">
      <Card.Body>
        <Card.Title>Qui sommes-nous?</Card.Title>
        <Card.Text>
          Le MHICC s'efforce de mener des essais cliniques de façon efficiente
          et efficace grâce à l'innovation afin de répondre aux besoins de sa
          clientèle.
        </Card.Text>
        <Card.Link href="/apropos">Venez lire sur notre mission</Card.Link>
      </Card.Body>
    </Card>
    <br />
    <Card className="text-center" bg="info" text="white">
      <Card.Body>
        <Card.Title>Le fonctionnement des études cliniques</Card.Title>
        <Card.Text>
          Les études cliniques sont une part essentielle du développement de
          nouveaux traitements. Malheureusement, recruter des patients
          représente un défi.
        </Card.Text>
        <Card.Link href="/fonctionnement">
          En apprendre plus sur le cycle de vie des études cliniques
        </Card.Link>
      </Card.Body>
    </Card>
    <br />
    <Card className="text-center" bg="secondary" text="white">
      <Card.Body>
        <Card.Title>Nos études cliniques</Card.Title>
        <Card.Text>
          Plusieurs études sont actuellement en cours de recrutement. Vous êtes
          intéressés? Vous pouvez accéder à notre page dédiée aux études
          cliniques ou faire le quiz interactif pour découvrir si vous êtes
          admissible!
        </Card.Text>
        <Card.Link href="/etudescliniques" text="white">
          Voir les études cliniques
        </Card.Link>{" "}
        <Button href="/questionnairepreliminaire" variant="primary">
          Faire le quiz
        </Button>
      </Card.Body>
    </Card>
    <br />

    <Card className="text-center" bg="danger" text="white">
      <Card.Body>
        <Card.Title>FAQ</Card.Title>
        <Card.Text>
          Nous sommes là pour vous aider dans votre de choix de participer ou
          non aux études cliniques. Vous avez probablement 1001 questions pour
          nous. Voilà pourquoi une section de notre site est réservé aux
          questions les plus fréquemment posées.
        </Card.Text>
        <Card.Link href="/apropos">Voir la foire aux questions</Card.Link>
      </Card.Body>
    </Card>
  </div>
);
//class accueil extends Component {
//render() {
//return (
//<div>
//Home page
//</div>
//)
//}
//}

//export default accueil;
