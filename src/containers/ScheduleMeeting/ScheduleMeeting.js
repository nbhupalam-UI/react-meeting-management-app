import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import Attendees from "../../components/Attendees/Attendees";
import { meetingControls } from "./meetingControls";
import { getFormElementsArray, checkValidity } from "../../shared/utility";
import classes from "./ScheduleMeeting.module.css";
import * as actions from "../../store/actions/index";

class ScheduleMeeting extends Component {
  state = {
    controls: meetingControls,
    ownUpdate: false,
    isUpdate: false,
    formIsValid: false,
    attendeesList: []
  };

  getUpdatedControls = (value, controlName) => {
    const { controls } = this.state;
    return {
      ...controls,
      [controlName]: {
        ...controls[controlName],
        value,
        valid:
          controlName === "attendees" && value === ""
            ? true
            : checkValidity(value, controls[controlName].validation),
        touched: true
      }
    };
  };

  isValid = (controls, attendeesList = []) => {
    let formIsValid = true;
    for (let inputIdentifier in controls) {
      formIsValid = controls[inputIdentifier].valid && formIsValid;
    }
    return formIsValid && attendeesList.length > 0;
  };

  inputChangedHandler = (value, controlName) => {
    const updatedControls = this.getUpdatedControls(value, controlName);
    let formIsValid = this.isValid(updatedControls, this.state.attendeesList);
    this.setState({ controls: updatedControls, ownUpdate: true, formIsValid });
  };

  static getDerivedStateFromProps(props, state) {
    if (!state.ownUpdate) {
      const {
        meetingDetails,
        match: {
          params: { dateParam }
        }
      } = props;
      const { controls } = state;
      if (meetingDetails && dateParam) {
        const { attendeesList = [], name } = { ...meetingDetails };
        Object.keys(meetingDetails).forEach((controlName) => {
          if (controls[controlName]) {
            controls[controlName].value = meetingDetails[controlName];
            controls[controlName].valid = checkValidity(
              meetingDetails[controlName],
              controls[controlName].validation
            );
          }
        });
        state.isUpdate = name !== "";
        state.attendeesList = attendeesList;
        return state;
      }
      state.isUpdate = false;
      state.attendeesList = [];
      Object.keys(controls).forEach((controlName) => {
        controls[controlName].value = "";
      });
      return state;
    }
    return null;
  }

  componentDidMount() {
    const {
      fetchMeetingDetails,
      match: {
        params: { dateParam }
      }
    } = this.props;
    if (dateParam) {
      fetchMeetingDetails(dateParam);
    }
  }

  deleteAttendee = (email) => {
    const attendeesList = this.state.attendeesList.filter(
      (attendee) => attendee !== email
    );
    const formIsValid = this.isValid(this.state.controls, attendeesList);
    this.setState({ attendeesList, formIsValid, ownUpdate: true });
  };

  addAttendee = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const {
        controls: {
          attendees: { value, valid }
        },
        attendeesList
      } = this.state;
      if (valid) {
        if (attendeesList.indexOf(value) === -1) {
          const updatedControls = this.getUpdatedControls("", "attendees");
          const attendees = attendeesList.concat(value);
          const formIsValid = this.isValid(updatedControls, attendees);
          this.setState({
            attendeesList: attendees,
            controls: updatedControls,
            formIsValid,
            ownUpdate: true
          });
        } else {
          let { controls } = this.state;
          controls = {
            ...controls,
            attendees: {
              ...controls["attendees"],
              value,
              valid: false,
              touched: true
            }
          };
          this.setState({ controls, ownUpdate: true });
        }
      }
    }
  };

  submitHandler = (event) => {
    event.preventDefault();
    const {
      controls: { date, name, description },
      attendeesList
    } = this.state;
    this.props.createOrUpdateMeeting(
      {
        date: date.value,
        name: name.value,
        description: description.value,
        attendeesList
      },
      this.props.history
    );
  };
  render() {
    const formElementsArray = getFormElementsArray(this.state.controls);
    let form = formElementsArray.map((formElement) => (
      <Input
        label={formElement.config.label}
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={(event) =>
          this.inputChangedHandler(event.target.value, formElement.id)
        }
        keyDownHandler={(event) =>
          formElement.config.elementConfig.type === "email"
            ? this.addAttendee(event)
            : ""
        }
      />
    ));
    if (this.props.loading) {
      form = <Spinner />;
    }

    let errorMessage = null;

    if (this.props.error) {
      errorMessage = (
        <p className={classes.Error}>{this.props.error.message}</p>
      );
    }
    let title = "Schedule Meeting";
    if (this.state.isUpdate) {
      title = `Update Meeting details scheduled on ${this.state.controls.date.value}`;
    }
    return (
      <div className={classes.Container}>
        <h2 className={classes.TextCenter}>{title}</h2>
        {errorMessage}
        <form onSubmit={this.submitHandler} noValidate>
          {form}
          <Attendees
            attendeesList={this.state.attendeesList}
            onDeleteHandler={this.deleteAttendee}
          />
          <div className={classes.TextCenter}>
            <Button
              type="submit"
              btnType="Success"
              disabled={!this.state.formIsValid}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    meetingDetails: state.meeting.meetingDetails
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createOrUpdateMeeting: (data, history) =>
      dispatch(actions.saveMeeting(data, history)),
    fetchMeetingDetails: (date) => dispatch(actions.fetchMeeting(date))
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ScheduleMeeting)
);
