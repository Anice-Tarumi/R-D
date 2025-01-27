import React from "react";
import { playSound } from "../manager/audioManager";

const ArrowButton = ({ direction, onClick }) => {
  return (
    <div
      className={`arrow-button arrow-${direction}`} // "arrow-left" or "arrow-right"
      onClick={() => {
        onClick
      }}
    >
      <div className="arrow-icon" />
    </div>
  );
};

export default ArrowButton;
