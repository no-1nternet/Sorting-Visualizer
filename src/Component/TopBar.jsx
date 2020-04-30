import React from "react";
import classes from "./TopBar.module.css";
import Button from '../Component/Button/Button';
const TopBar = props => {
  return (
      <div className={classes.topBar}>
        <h1 className={classes.titleName}>Sorting Visualizer</h1>
        <Button text = {"Bubble Sort"} onClick ={props.bubble} disabled = { props.sorting } />
        <Button text = {"Merge Sort"} onClick ={props.merge} disabled = { props.sorting }/>
        <Button text = {"Quick Sort"} onClick ={props.quick} disabled = { props.sorting }/>
        <Button text = {"Generate New Array"} onClick ={props.new} disabled = { props.sorting }/>
      </div>
  );
};

export default TopBar;
