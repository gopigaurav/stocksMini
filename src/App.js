import "./App.css";
import logo from "./assets/Quickieapp-logo.png";
import Cards from "./Cards";
import Tables from "./Tables";
import React, { useState } from "react";

function App() {
  const [openSavedData, setOpenSavedData] = useState(false);
  return (
    <>
      <div className="app">
        <div className="header">
          <img className="" src={logo} alt="logo" />
        </div>
        <div className="content-body">
          <div className="content-body_cards">
            <Cards sym="Goog" imgLoc="GOOGL.png" price={51616161} />
            <Cards sym="FB" imgLoc="FB.png" price={55754154} />
            <Cards sym="AMZN" imgLoc="AMZN.svg" price={65149851} />
          </div>
          {openSavedData ? (
            <div className="content-body_table">
              <Tables setOpenSavedData={setOpenSavedData}/>
            </div>
          ) : (
            <div className="content-body_table">
              <Tables />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
