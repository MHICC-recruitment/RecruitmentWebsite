import React from "react";
import styles from "./Filter.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const Filter = (props) => {
    return (
        <div className = {styles.box}>
            <Row>
                <Col>
                Age :
                <input className={styles["input-age"]} onChange={props.handleAge} type="number" placeholder="Votre age"/>
                ans
                </Col>
                <Col>
                Nom : 
                <input className={styles["input-nom"]} onChange={props.handleInput} type="text" placeholder="Nom de l'étude clinique"/>
                </Col>
                <Col>
                Sexe :
                <select className={styles["input-sexe"]}
                defaultValue=""
                onChange={props.handleSexe}>
                <option value="F">F</option>
                <option value="M">M</option>
                <option value="">All</option>
                </select>
                </Col>
            </Row>
        </div>
    )
}