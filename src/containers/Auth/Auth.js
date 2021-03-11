import React, { Component } from "react";
import { connect } from "react-redux";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import { checkValidity, getFormElementsArray } from "../../shared/utility";
import * as actions from "../../store/actions/index";
import { authControls } from "./authControls";
import classes from "./Auth.module.css";

class Auth extends Component {
  state = {
    controls: authControls,
    formIsValid: false
  };

  getUpdatedControls = (value, controlName) => {
    const { controls } = this.state;
    return {
      ...controls,
      [controlName]: {
        ...controls[controlName],
        value,
        valid: checkValidity(value, controls[controlName].validation),
        touched: true
      }
    };
  };

  inputChangedHandler = (value, controlName) => {
    const updatedControls = this.getUpdatedControls(value, controlName);
    let formIsValid = true;
    for (let inputIdentifier in updatedControls) {
      formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
    }
    this.setState({ controls: updatedControls, formIsValid });
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value
    );
  };

  render() {
    const formElementsArray = getFormElementsArray(this.state.controls);

    let form;

    if (this.props.loading) {
      form = <Spinner />;
    } else {
      form = formElementsArray.map((formElement) => (
        <Input
          key={formElement.id}
          label={formElement.config.label}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          changed={(event) =>
            this.inputChangedHandler(event.target.value, formElement.id)
          }
        />
      ));
    }

    let errorMessage = null;

    if (this.props.error) {
      errorMessage = (
        <p className={classes.Error}>{this.props.error.message}</p>
      );
    }

    return (
      <div className={classes.Auth}>
        {errorMessage}
        <h2 className={classes.TextCenter}>Please Login</h2>
        <form onSubmit={this.submitHandler} noValidate>
          {form}
          <div className={classes.TextCenter}>
            <Button
              type="submit"
              btnType="Success"
              disabled={!this.state.formIsValid}
            >
              SIGNIN
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
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password) => dispatch(actions.auth(email, password))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
