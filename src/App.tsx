import React, { useEffect } from "react";
import "./App.css";
import runThreeCanvas from "./runThreeCanvas";
// import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom"

const App = () => {
  useEffect(() => {
    runThreeCanvas();
  }, []);
  return (
    <div>
      <canvas id="canvas"></canvas>
    </div>
  );
};

export default App;
