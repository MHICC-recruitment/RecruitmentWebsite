import React, { Component } from "react";
import { Filter } from "./Components/Filter";
import { ListeEtudes } from "./Components/ListeEtudes"

export class etudescliniques extends Component {
constructor(props) {
  super(props);
  this.state = {
    etudes: [
      {name: "Diabète de type 2", title: "Développement d'un nouveau médicament", age: "40-50", date:"19 mars 2019"},
      {name: "Scoliose", title:"Développemen d'un nouveau traitement", age: "50-60", date:"25 février 2019"},
      {name: "maladie rare", title:"Développement d'une nouvelle méthode", age: "60-70", date:"12 juin 2019"}
    ],
  etudeSelect:''
  }
}
handleInput = (e) => {
this.setState({ etudeSelect : e.target.value})
}
  render(){
    let filteredEtudes = this.state.etudes.filter((etude) => {
      return etude.name.toLowerCase().includes(this.state.etudeSelect.toLowerCase())
    })
  return ( 
    <div>
      <h2> Études cliniques</h2>
      <p>Voici les études cliniques en cours.</p>
      <Filter handleInput={this.handleInput}/>
      <ListeEtudes filteredEtudes={filteredEtudes}/>  
    </div>
  );
  }
}
