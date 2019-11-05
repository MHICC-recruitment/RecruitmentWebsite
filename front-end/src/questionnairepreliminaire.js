import React from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export const questionnairepreliminaire = () => (
  <div>
    <Breadcrumb>
      <Breadcrumb.Item href="/">Accueil</Breadcrumb.Item>
      <Breadcrumb.Item active>Questionnaire</Breadcrumb.Item>
    </Breadcrumb>
    <h2> Questionnaire préliminaire</h2>
    <p>
      Répondez à ce court questionnaire pour découvrir les études cliniques
      auxquelles vous êtes admissible.
    </p>

    <Form>
      <Form.Group>
        <Form.Label>Adresse courriel</Form.Label>
        <Form.Control
          type="email"
          placeholder="Entrer votre adresse courriel"
        />
        <Form.Text className="text-muted">
          Votre adresse courriel ne sera conservée que si vous acceptés.
        </Form.Text>
      </Form.Group>
      <Form.Group controlId="formNaissance">
        <Form.Label>Date de naissance</Form.Label>
        <Form.Row>
          <Form.Group controlId="formAnnee">
            <Form.Label>Année</Form.Label>
            <Form.Control as="select">
              <option>2001</option>
              <option>2000</option>
              <option>1999</option>
              <option>1998</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formMois">
            <Form.Label>Mois</Form.Label>
            <Form.Control as="select">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formJour">
            <Form.Label>Jour</Form.Label>
            <Form.Control as="select">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>
      </Form.Group>

      <Form.Group controlId="formGender">
        <Form.Label>Sexe</Form.Label>
        <Form.Row>
          <Form.Check conrtolId="Homme" type="checkbox" label="Homme" />
          <Form.Check conrtolId="Femme" type="checkbox" label="Femme" />
          <Form.Check conrtolId="Autre" type="checkbox" label="Autre" />
        </Form.Row>
      </Form.Group>

      <Form.Group>
        <Form.Label>Code postal</Form.Label>
        <Form.Control placeholder="Code postal" />
      </Form.Group>

      <Form.Group controlId="formSante">
        <Form.Label>Est-vous en bonne santé?</Form.Label>
        <Form.Control as="textarea" />
      </Form.Group>

      <Form.Group controlId="formFume">
        <Form.Label>Êtes-vous fumeur?</Form.Label>
        <Form.Row>
          <Form.Check conrtolId="fumeur_oui" type="checkbox" label="Oui" />
          <Form.Check conrtolId="fumeur_non" type="checkbox" label="Non" />
        </Form.Row>
      </Form.Group>

      <Form.Group controlId="formTerms">
        <Form.Check
          type="checkbox"
          label="J'ai lu et j'accepte les termes et conditions"
        />
        <Card.Link href="/termes">Termes et conditions</Card.Link>
      </Form.Group>

      <Button variant="primary" type="submit">
        Soumettre
      </Button>
    </Form>
  </div>
);
