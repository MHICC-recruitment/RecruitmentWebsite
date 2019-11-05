import React from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export const questionnairepreliminaire = () => (
  <div>
    <Breadcrumb>
      <Breadcrumb.Item href="/accueil">Accueil</Breadcrumb.Item>
      <Breadcrumb.Item active>Questionnaire</Breadcrumb.Item>
    </Breadcrumb>
    <h2> Questionnaire préliminaire</h2>
    <p>
      Répondez à ce court questionnaire pour découvrir les études cliniques pour
      lesquelles vous êtes admissible.
    </p>
  </div>
);
