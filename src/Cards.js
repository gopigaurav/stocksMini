import React from "react";
import "./Cards.css";

function Cards({ sym, imgLoc, price }) {
  return (
    <>
      <div dragable={true} className="content-body_cards-body ">
        <div className="logonname">
          <p>{sym}</p>
          <img width="50" src={require(`./assets/${imgLoc}`).default} />
        </div>
        <div className="stock-mkt-price">{price}USD</div>
      </div>
    </>
  );
}

export default Cards;
