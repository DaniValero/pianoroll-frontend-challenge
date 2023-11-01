import React, { createContext, useState, useEffect } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [appState, setAppState] = useState({
    data: [], // Fetched data
    selectedRoll: null,
    first20Rolls: [],
  });

  // Fetch data when the app loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://pianoroll.ai/random_notes');
        const data = await response.json();
        
        const partitionedData = [];
        const chunkSize = 60;
        for (let i = 0; i < data.length; i += chunkSize) {
          const chunk = data.slice(i, i + chunkSize);
          partitionedData.push(chunk);
        }

         // Create an array of objects with IDs
        const first20Rolls = partitionedData.slice(0, 20).map((partData, index) => ({
          id: index + 1,
          data: partData,
        }));

        setAppState((prevState) => ({
          ...prevState,
          data: data,
          first20Rolls: first20Rolls,
        }));
        
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    
    fetchData();
  }, []);
  
  const handleSelectRoll = (rollData) => {
    setAppState((prevState) => ({
      ...prevState,
      selectedRoll: rollData,
    }));
  };

  const handleFirst20Rolls = (data) => {
    setAppState((prevState) => ({
      ...prevState,
      first20Rolls: data
    }))
  }

  return (
    <AppContext.Provider value={{ appState, handleSelectRoll, handleFirst20Rolls }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };