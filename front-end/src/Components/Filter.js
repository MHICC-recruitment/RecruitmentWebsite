import React from "react";
import styles from "../App.module.css";

export const Filter = (props) => {
    return (
        <div>
            <input onChange={props.handleInput} type="text"/>
        </div>
    )
}