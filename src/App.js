import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import asyncComponent from "./hoc/asyncComponent/asyncComponent";
import Layout from "./hoc/Layout/Layout";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";

const DashboardAsync = asyncComponent(() => {
  return import("./components/Dashboard/Dashboard");
});

const ScheduleMeetingAsync = asyncComponent(() => {
  return import("./containers/ScheduleMeeting/ScheduleMeeting");
});

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignin();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Redirect to="/auth" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/dashboard" component={DashboardAsync} />
          <Route
            path="/schedule-meeting/:dateParam?"
            component={ScheduleMeetingAsync}
          />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={DashboardAsync} />
          <Redirect to="/dashboard" />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignin: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
