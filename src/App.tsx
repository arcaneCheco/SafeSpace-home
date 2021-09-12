import React, { useEffect } from "react";
import "./App.css";
import runThreeCanvas from "./runThreeCanvas";
// import WaitingListForm from "./WaitinglistFrom";

const App = () => {
  useEffect(() => {
    runThreeCanvas();
  }, []);
  return (
    <div>
      <canvas id="canvas"></canvas>
      <div className="navigation-helper">
        <div className="nav-message">Scroll to Navigate</div>
      </div>
      {/* <WaitingListForm /> */}
    </div>
  );
};

export default App;
