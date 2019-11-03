import React from "react";
import styles from "../App.module.css";

export const Filter = (props) => {
    return (
        <div>
            Age : 
            <input onChange={props.handleAge} type="text"/>
            ans
            Nom : 
            <input onChange={props.handleInput} type="text"/>
            Sexe :
            <select
            defaultValue=""
            onChange={props.handleSexe}>
            <option value="F">F</option>
            <option value="M">M</option>
            <option value="">All</option>
            </select>
        </div>
    )
}