import React from "react";

import Button from "../Button/Button";
import classes from "./Chip.module.css";

const Chip = ({ text, onDeleteHandler }) => {
  return (
    <span className={classes.Chip}>
      <span className={classes.ChipText}>{text}</span>
      <Button classes={[classes.DeleteButton]} clicked={onDeleteHandler}>
        x
      </Button>
    </span>
  );
};

export default Chip;
