import React from "react";

import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <div className={classes.Logo}>
      <Logo />
    </div>
    <h1 className={classes.Title}>Meeting Management App</h1>
    <nav>
      <NavigationItems isAuthenticated={props.isAuth} />
    </nav>
  </header>
);

export default toolbar;
