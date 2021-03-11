import React from "react";

import Aux from "../../../hoc/AuxComp/AuxComp";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.module.css";

const navigationItems = ({ isAuthenticated }) => (
  <ul className={classes.NavigationItems}>
    {isAuthenticated && (
      <Aux>
        <NavigationItem link="/dashboard">Dashboard</NavigationItem>
        <NavigationItem link="/schedule-meeting">
          Schedule Meeting
        </NavigationItem>
        <NavigationItem link="/logout">Logout</NavigationItem>
      </Aux>
    )}
  </ul>
);

export default navigationItems;
