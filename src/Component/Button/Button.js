import React from "react";
import classes from "./Button.module.css";

const button = props => (
  <button onClick={props.onClick} className={classes.Button} disabled = {props.disabled}>
    {props.text}
  </button>
);
export default button;
