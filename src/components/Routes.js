import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Form from "./../pages/Form";
import List from "./../pages/List"

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/home" component={List} />
        <Route path="/create" component={Form} />
      </Switch>
    </BrowserRouter>
  );
}