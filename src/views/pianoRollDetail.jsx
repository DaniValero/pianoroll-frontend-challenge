import React, { useContext, useEffect } from "react";
import { AppContext } from "../utils/context";
import PianoRoll from "../components/PianoRoll";
import { Link, useParams } from "react-router-dom";
import PianoRollCard from "../components/PianoRollCard";
import spinner from "../assets/spinner.svg"

function PianoRollDetail() {
  const { appState, handleSelectRoll } = useContext(AppContext);
  const { id } = useParams();

  if (!appState.selectedRoll || !appState.first20Rolls) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    const handleSelectRoll = (rollData) => {
    if (rollData.id === undefined) {
      rollData.id = id;
    }

    setAppState((prevState) => ({
      ...prevState,
      selectedRoll: rollData,
    }));
};

  }, [id]);

  const handleSelection = (index) => {
    handleSelectRoll(appState.first20Rolls[index]);
  };

  return (
    <div className="main-view">
      <div className="main-roll">
      {appState.selectedRoll && appState.selectedRoll.data && appState.selectedRoll.data.length >= 60 ? (
        <PianoRoll key={appState.selectedRoll.id} sequence={appState.selectedRoll.data} />
      ) : (
        <div className="spinner">
            <img src={spinner} alt="loading" />
            <p>Loading...</p>
        </div>
      )}
      </div>

      <div className="roll-list">
        {appState.first20Rolls.map((roll, index) => {
          if (roll.data && roll.data.length >= 60) {
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
          }
          return null;
        })}
      </div>
    </div>
  );
}

export default PianoRollDetail;
