import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import styles from "./accueil.css";

export const accueil = () => (
  <div id = "MainPage" className = {styles["Main-Page"]}>
    <Breadcrumb>
      <Breadcrumb.Item active>Accueil</Breadcrumb.Item>
    </Breadcrumb>

    <section id = "Welcome">
      <h1>Welcome</h1>
      <h2>
        The MHICC strives to conduct clinical trials efficiently and effectively
        through innovation in order to fulfill our customer needs.
      </h2>
    </section>
    <br />

    <section id = "Main_about">
      <h1>About the MHICC/Qui sommes-nous?</h1>
      <p>The MHICC strives to conduct clinical trials efficiently and
            effectively through innocation in order to fulfill our customer
            needshe MHICC strives to conduct clinical trials efficiently and
            effectively through innocation in order to fulfill our customer
            needshe MHICC strives to conduct clinical trials efficiently and
            effectively through innocation in order to fulfill our customer
            needshe MHICC strives to conduct clinical trials efficiently and
            effectively through innocation in order to fulfill our customer
            needshe MHICC strives to conduct clinical trials efficiently and
            effectively through innocation in order to fulfill our customer
            needs</p>
      <Button variant = "outline-light" href = "/apropos"> Venez lire sur notre mission</Button>
    </section>
    <br />
    <section id="accueilhowitworks">
      <h1>How it works/Le fonctionnement des études cliniques</h1>
        <p>Les études cliniques sont une part essentielle du développement de
            nouveaux traitements. Malheureusement, recruter des patients
            représente un défi.</p>
      <h2>1- Find a study</h2>
        <p>The MHICC strives to conduct clinical trials efficiently and
            effectively through innocation in order to fulfill our customer
            needshe MHICC strives to conduct</p>
      <h2>2- Fill out an application form</h2>
        <p>The MHICC strives to conduct clinical trials efficiently and
              effectively through innocation in order to fulfill our customer
              needshe MHICC strives to conduct</p>
      <h2>3- Communicate with a health professionnal</h2>
        <p>The MHICC strives to conduct clinical trials efficiently and
              effectively through innocation in order to fulfill our customer
              needshe MHICC strives to conduct
            </p> href="/fonctionnement">
            En apprendre plus sur le cycle de vie des études cliniques
      <br />
    </section>

    <section id="accueilclinicalstudies">
      <h1>Nos études cliniques</h1>
          <p>
            Plusieurs études sont actuellement en cours de recrutement. Vous
            êtes intéressés? Vous pouvez accéder à notre page dédiée aux études
            cliniques ou faire le quiz interactif pour découvrir si vous êtes
            admissible!
          </p>
          <Button href="/etudescliniques" variant = "outline-dark">Voir les études cliniques</Button>
          <Button href="/questionnairepreliminaire" variant="primary" size = "lg">Faire le quiz</Button>
      <br />
    </section>
    <section>
      <h1>Foire aux questions</h1>
          <p>
          Nous sommes là pour vous aider dans votre de choix de participer ou
            non aux études cliniques. Vous avez probablement 1001 questions pour
            nous. Voilà pourquoi une section de notre site est réservé aux
            questions les plus fréquemment posées.
          </p>
          <Button href="/faq" variant = "outline-dark">Voir la foire aux questions</Button>
      <br />
    </section>
    <br />
  </div>
);

/*  <script src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.slim.js"></script>
  <script src = "App.js"></script> */

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
