import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Modal from "../../components/UI/Modal/Modal";
import { MONTHS, WEEKDAYS } from "../../shared/constants";
import { currentMonth, currentYear, datesArray } from "../../shared/utility";
import classes from "./Dashboard.module.css";

const Dashboard = ({ meetingsList, history }) => {
  const [meeting, setMeeting] = useState({});
  let clickCount = 0;
  let singleClickTimer = null;

  const monthYear = MONTHS[currentMonth] + " " + currentYear;

  const getFullDate = (date) => {
    return `${String(date).padStart(2, 0)}-${String(currentMonth + 1).padStart(
      2,
      0
    )}-${currentYear}`;
  };

  const handleDoubleClick = (date) => {
    const fullDate = getFullDate(date);
    history.push(`/schedule-meeting/${fullDate}`);
  };

  const onClickHandler = (date) => {
    clickCount++;
    if (clickCount === 1) {
      singleClickTimer = setTimeout(() => {
        clickCount = 0;
        showMeetingDetails(date);
      }, 200);
    } else if (clickCount === 2) {
      clearTimeout(singleClickTimer);
      clickCount = 0;
      handleDoubleClick(date);
    }
  };

  const getMeeting = (date) => {
    const fullDate = getFullDate(date);
    return meetingsList.filter((f) => {
      return fullDate === f.date;
    })[0];
  };
  const getClassName = (date) => {
    const meeting = getMeeting(date);
    if (meeting) {
      return classes.hasMeeting;
    }
    return "";
  };
  const showMeetingDetails = (date) => {
    setMeeting(getMeeting(date) || {});
  };
  return (
    <div className={classes.Container}>
      <h2 className={[classes.Title, classes.TextCenter].join(" ")}>
        Dashboard
      </h2>
      <div className={classes.Dashboard}>
        <Modal
          show={!!meeting && Object.keys(meeting).length > 0}
          modalClosed={() => setMeeting({})}
        >
          <h3 className={classes.TextCenter}>
            Meeting Details for{" "}
            <span className={classes.Detail}>{meeting.date}</span>
          </h3>
          <ul className={classes.MeetingDetails}>
            <li>
              Scheduled by:{" "}
              <span className={classes.Detail}>{meeting.name}</span>
            </li>
            <li>
              Description:{" "}
              <span className={classes.Detail}>{meeting.description}</span>
            </li>
            <li>
              Attendees:{" "}
              <span className={classes.Detail}>
                {(meeting.attendeesList || []).map((attendee, index, arr) => [
                  <a href={`mailto:${attendee}`} key={index}>
                    {attendee}
                  </a>,
                  index !== arr.length - 1 ? ", " : ""
                ])}
              </span>
            </li>
          </ul>
        </Modal>
        <section className={classes.CalendarHeader}>
          <div className={classes.CurrentMonth}>{monthYear}</div>
        </section>

        <ul className={classes.WeekDay}>
          {WEEKDAYS.map((day) => (
            <li key={day}>{day}</li>
          ))}
        </ul>

        <ul className={classes.DaysGrid}>
          {datesArray.map((_, i) => (
            <li
              className={classes.CalendarDay}
              key={i + 1}
              onClick={() => onClickHandler(i + 1)}
            >
              <p>
                <span>{i + 1}</span>
                <span className={getClassName(i + 1)}></span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    meetingsList: state.meeting.meetingsList
  };
};

export default withRouter(connect(mapStateToProps)(Dashboard));
