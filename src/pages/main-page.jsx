import React, { useState, useEffect } from "react";
import PianoRollCard from "../components/PianoRollCard";


function MainPage() {
  const [selectedRoll, setSelectedRoll] = useState(null);
  const [data, setData] = useState([]);

  const handleCardClick = (rollData) => {
    setSelectedRoll(rollData);
  };


  useEffect(() => {
    const getData = async() => {
      
      await fetch("https://pianoroll.ai/random_notes")
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((error) => console.error("Error loading data:", error));
    }
    getData();
  }, []);

  // Partition the data into groups of 60
  const partitionedData = [];
  const chunkSize = 60;

  
  for (let i = 0; i < data.length; i += chunkSize) {
    const chunk = data.slice(i, i + chunkSize);
    partitionedData.push(chunk);
  }

  // Limit to the first 20 cards
  const first20Groups = partitionedData.slice(0, 20);

  return (
    <div id="pianoRollContainer">
      {first20Groups.map((partData, index) => {
        if (partData.length < 60) {
          return null;
        }
        return (
          <PianoRollCard
            key={index}
            rollId={index + 1}
            sequenceData={partData}
            onClick={() => handleCardClick(partData)}
          />
        );
      })}
    </div>
  );
}

export default MainPage;
