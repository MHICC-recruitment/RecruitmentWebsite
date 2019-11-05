import React from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";

export const fonctionnement = () => (
  <div>
    <Breadcrumb>
      <Breadcrumb.Item href="/accueil">Accueil</Breadcrumb.Item>
      <Breadcrumb.Item active>Fonctionnement</Breadcrumb.Item>
    </Breadcrumb>
    <h2> Le cycle de vie des études cliniques </h2>
    <p>Voici comment ça fonctionne.</p>
  </div>
);
