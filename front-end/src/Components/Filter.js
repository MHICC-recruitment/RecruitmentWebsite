import React from "react";
import "./Filter.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const Filter = (props) => {
    return (
        <div className = "box">
                <Row noGutters="true">
                Age : 
                <input className="inputAge" onChange={props.handleAge} type="text" placeholder="Votre age"/>
                ans
                </Row>
                <Row noGutters="true"> 
                Nom : 
                <input className="inputNom" onChange={props.handleInput} type="text" placeholder="Nom de l'étude clinique"/>
                </Row>
                <Row noGutters="true">
                Sexe :
                <select className="inputSexe"
                defaultValue=""
                onChange={props.handleSexe}>
                <option value="F">F</option>
                <option value="M">M</option>
                <option value="">All</option>
                </select>
                </Row>
        </div>
    )
}