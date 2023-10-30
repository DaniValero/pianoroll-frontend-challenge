import React from "react";
import PianoRoll from "./pianoroll";

function PianoRollCard({ rollId, sequenceData }) {
  return (
    <div className="piano-roll-card">
      <div className="description">This is a piano roll number {rollId}</div>
      {sequenceData ? (
        <PianoRoll sequence={sequenceData} />
      ) : (
        <div>Loading data...</div>
      )}
    </div>
  );
}

export default PianoRollCard;
