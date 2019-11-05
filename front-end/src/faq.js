import React from "react";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Breadcrumb from "react-bootstrap/Breadcrumb";

export const faq = () => (
  <div>
    <Breadcrumb>
      <Breadcrumb.Item href="/accueil">Accueil</Breadcrumb.Item>
      <Breadcrumb.Item active>FAQ</Breadcrumb.Item>
    </Breadcrumb>

    <h2> FAQ </h2>
    <p>
      Vous avez des questions? Voici les plus fréquement posées. Cliquez sur les
      questions qui vous intéressent pour afficher leur réponse!
    </p>

    <Accordion>
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="0">
          Serai-je payé pour participer à une étude clinique?
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body>Non.</Card.Body>
        </Accordion.Collapse>
      </Card>
      <br />

      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="1">
          Puis-je participer à plusieurs études cliniques simultanément?
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="1">
          <Card.Body>
            Il est préférable de ne participer qu'à une étude à la fois afin de
            ne pas biaiser les résultats.
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <br />

      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="2">
          Quel est le fonctionnement dans le cas d'une personne qui ne peut pas
          donner son consentement?
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="2">
          <Card.Body>
            Alors, c'est une tierse personne qui donne le consentement.
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <br />
    </Accordion>
  </div>
);
