import React, { Component } from "react";
import { Filter } from "./Components/Filter";
import { ListeEtudes } from "./Components/ListeEtudes"

export class etudescliniques extends Component {
constructor(props) {
  super(props);
  this.state = {
    etudes: [
      {id: 1, name: "Diabète de type 2", title: "Développement d'un nouveau médicament", ageMin:40, ageMax:50, sexe:"FM", date:"19 mars 2019"},
      {id: 2, name: "Scoliose", title:"Développemen d'un nouveau traitement", ageMin:50, ageMax:60, sexe:"M", date:"25 février 2019"},
      {id: 3, name: "maladie rare", title:"Développement d'une nouvelle méthode", ageMin:60, ageMax:70, sexe:"F", date:"12 juin 2019"}
    ],
  etudeSelect:'',
  ageSelect:'',
  sexeSelect:''
  }
}

handleInput = (e) => {
  this.setState({ etudeSelect : e.target.value})
}

handleAge = (e) => {
this.setState({ ageSelect : e.target.value})
}
handleSexe = (e) => {
  this.setState({ sexeSelect : e.target.value})
}

render(){
    let filteredEtudes = this.state.etudes.filter((etude) => {
      return (
       this.state.ageSelect==""||(this.state.ageSelect >= etude.ageMin && this.state.ageSelect <= etude.ageMax)) &&
      (etude.name.toLowerCase().includes(this.state.etudeSelect.toLowerCase()))&&
      (etude.sexe.toLowerCase().includes(this.state.sexeSelect.toLowerCase()))
    })
  return ( 
    <div>
      <h2> Études cliniques</h2>
      <p>Voici les études cliniques en cours.</p>
      <Filter handleAge={this.handleAge} handleInput={this.handleInput} handleSexe={this.handleSexe}/>
      <ListeEtudes filteredEtudes={filteredEtudes}/>  
    </div>
  );
  }
}
