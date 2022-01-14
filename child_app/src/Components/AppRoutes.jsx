import React from "react";
import { Switch, Route } from "react-router-dom";

const Dashboard = () => (
  <div>
    <h1>IFrame Dashboard</h1>
  </div>
);
const Events = () => (
  <div>
    <h1>IFrame Events</h1>
  </div>
);
const DailyEvents = () => (
  <div>
    <h1>IFrame Daily Events</h1>
  </div>
);

export const AppRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/events" component={Events} />
      <Route exact path="/events/daily" component={DailyEvents} />
    </Switch>
  );
};
