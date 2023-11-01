import React, { useContext, useEffect } from "react";
import { AppContext } from "../utils/context";
import PianoRollCard from "../components/PianoRollCard";
import { Link } from "react-router-dom";


function MainPage() {
  const { appState, handleFirst20Rolls, handleSelectRoll } = useContext(AppContext);

  // This effect runs when appState.first20Rolls changes
  useEffect(() => {
    if (!appState.first20Rolls) {
      fetchData();
    }
  }, [appState.first20Rolls]);

  // Check if first20Rolls is defined
  if (!appState.first20Rolls) {
    return <div>Loading...</div>;
  }

  const handleSelection = (index) => {
    handleSelectRoll(index);
  }

  return (
    <div id="pianoRollContainer">
      {appState.first20Rolls.map((roll, index) => {
        if (roll.data.length < 60) {
          return null;
        }
        return (
          <div className="piano-card" key={roll.id}>
            <Link to={{ pathname: `/roll/${roll.id}` }} onClick={() => handleSelection(index)}>
              <PianoRollCard
                key={roll.id}
                rollId={roll.id}
                sequenceData={roll.data}
              />
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default MainPage;
