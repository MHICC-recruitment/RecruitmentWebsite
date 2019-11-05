import React, { Component } from "react";
import { Filter } from "../Components/Filter";
import { ListeEtudes } from "../Components/ListeEtudes";
import styles from "./etudescliniques.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";

export class etudescliniques extends Component {
  constructor(props) {
    super(props);
    this.state = {
      etudes: [
        {
          id: 1,
          name: "Diabète de type 2",
          title: "Développement d'un nouveau médicament",
          ageMin: 40,
          ageMax: 50,
          sexe: "FM",
          lien: "EtudeDiabete",
          date: "19 mars 2019"
        },
        {
          id: 2,
          name: "Scoliose",
          title: "Développemen d'un nouveau traitement",
          ageMin: 50,
          ageMax: 60,
          sexe: "M",
          lien: "EtudeScoliose",
          date: "25 février 2019"
        },
        {
          id: 3,
          name: "Maladie rare",
          title: "Développement d'une nouvelle méthode",
          ageMin: 60,
          ageMax: 70,
          sexe: "F",
          lien: "EtudeMR",
          date: "12 juin 2019"
        },
        {
          id: 4,
          name: "Hypertension",
          title: "Développement d'une nouvelle méthode",
          ageMin: 50,
          ageMax: 70,
          sexe: "F",
          lien: "EtudeHP",
          date: "15 avril 2019"
        }
      ],
      etudeSelect: "",
      ageSelect: "",
      sexeSelect: ""
    };
  }

  handleInput = e => {
    this.setState({ etudeSelect: e.target.value });
  };

  handleAge = e => {
    this.setState({ ageSelect: e.target.value });
  };
  handleSexe = e => {
    this.setState({ sexeSelect: e.target.value });
  };

  render() {
    let filteredEtudes = this.state.etudes.filter(etude => {
      return (
        (this.state.ageSelect == "" ||
          (this.state.ageSelect >= etude.ageMin &&
            this.state.ageSelect <= etude.ageMax)) &&
        etude.name
          .toLowerCase()
          .includes(this.state.etudeSelect.toLowerCase()) &&
        etude.sexe.toLowerCase().includes(this.state.sexeSelect.toLowerCase())
      );
    });
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item href="/">Accueil</Breadcrumb.Item>
          <Breadcrumb.Item active>Études cliniques</Breadcrumb.Item>
        </Breadcrumb>
        <h2> Études cliniques</h2>
        <p>Voici les études cliniques en cours.</p>
        <Filter
          handleAge={this.handleAge}
          handleInput={this.handleInput}
          handleSexe={this.handleSexe}
        />
        <ListeEtudes filteredEtudes={filteredEtudes} />
      </div>
    );
  }
}
