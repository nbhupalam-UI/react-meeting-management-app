import React from "react";

import Chip from "../UI/Chip/Chip";
import classes from "./Attendees.module.css";

const Attendees = ({ attendeesList, onDeleteHandler }) => {
  return (
    <div className={classes.Attendees}>
      {attendeesList.map((attendee, index) => (
        <Chip
          text={attendee}
          key={index}
          onDeleteHandler={() => onDeleteHandler(attendee)}
        />
      ))}
    </div>
  );
};

export default Attendees;
