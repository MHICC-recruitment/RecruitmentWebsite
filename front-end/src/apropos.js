import React from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";

export const apropos = () => (
  <div>
    <Breadcrumb>
      <Breadcrumb.Item href="/">Accueil</Breadcrumb.Item>
      <Breadcrumb.Item active>À propos</Breadcrumb.Item>
    </Breadcrumb>
    <h2> MHICC - Notre mission </h2>
    <p>
      Le MHICC s'efforce de mener des essais cliniques de façon efficiente et
      efficace grâce à l'innovation afin de répondre aux besoins de sa clientèle{" "}
    </p>
  </div>
);
