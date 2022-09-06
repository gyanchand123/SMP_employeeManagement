import React, { useContext } from "react";
import classes from "./PopUp.module.scss";
import { PopUpContext } from "../../Services/PopUpContext/PopUpContext";

const BackDrop = () => {
  const { togglePopUp } = useContext(PopUpContext);
  return <div className={classes.backdrop} onClick={togglePopUp} />;
};
export default BackDrop;
