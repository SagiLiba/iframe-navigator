import React from "react";
import "./App.css";
import { AppRoutes } from "./Components/AppRoutes";
import { Navigation } from "./Components/Navigation";
import { IFrame } from "./Components/IFrame";

function App() {
  return (
    <div className="App">
      <Navigation />
      <div className="content">
        <AppRoutes />
        <IFrame />
      </div>
    </div>
  );
}

export default App;
