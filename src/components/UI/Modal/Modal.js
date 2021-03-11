import React, { Component } from "react";

import classes from "./Modal.module.css";
import Aux from "../../../hoc/AuxComp/AuxComp";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }

  render() {
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          className={[classes.Modal, this.props.show ? classes.Show : ""].join(
            " "
          )}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Modal;
