import React from "react";
import PianoRoll from "./PianoRoll";
import spinner from "../assets/spinner.svg"

function PianoRollCard({ rollId, sequenceData }) {
  return (
    <div className="piano-roll-card">
      <div className="description">Piano roll number {rollId}</div>
      {sequenceData ? (
        <PianoRoll sequence={sequenceData} rolldId={rollId} />
      ) : (
          <div className="spinner">
            <img src={spinner} alt="loading" />
            <p>Loading...</p>
          </div>
      )}
    </div>
  );
}

export default PianoRollCard;
