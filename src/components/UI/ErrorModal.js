import React from "react";
import ReactDom from "react-dom";
import Card from "./Card";
import Button from "./Button";
import classes from "./ErrorModal.module.css";
//here you have added the portal 

const BackDrop = (props) => {
  return (
    <>
      <div className={classes.backdrop} onClick={props.onConfirm} />
      <Card className={classes.modal}>
        <header className={classes.header}>
          <h2>{props.title}</h2>
        </header>
        <div className={classes.content}>
          <p>{props.message}</p>
        </div>
        <footer className={classes.actions}>
          <Button onClick={props.onConfirm}>Okay</Button>
        </footer>
      </Card>
    </>
  );
};

const ErrorModal = (props) => {
  return (
    <>
      {ReactDom.createPortal(
        <BackDrop onConfirm={props.onConfirm} title={props.title} message={props.message} />,
        document.getElementById("errorModal")
      )}
    </>
  );
};

export default ErrorModal;
