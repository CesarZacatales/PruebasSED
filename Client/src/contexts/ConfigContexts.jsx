import React, { useState } from "react";

const ConfigContext = React.createContext();


export const ConfigProvider = (props) => {
  const [loading, setLoading] = useState(false);
  const [favorites,setFavorites] = useState([]);

  const addToFavorites=(book)=>{
    const oldFavorites=[...favorites];
    const newFavorites=oldFavorites.concat(book);
    setFavorites(newFavorites);
  }
  const RemovedToFavorites=(id)=>{
    const oldFavorites=[...favorites];
    const newFavorites=oldFavorites.filter((book)=>book._id!==id);
    setFavorites(newFavorites);
  }


  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  const state = {
    loading,
    startLoading,
    stopLoading,
    favorites,
    addToFavorites,
    RemovedToFavorites
  }

  return (
    <ConfigContext.Provider value={state} {...props} />
  )
}

export const useConfigContext = () => {
  const context = React.useContext(ConfigContext);

  if (!context)
    throw new Error("useConfigContext must be call inside of a ConfigContextProvider component");

  return context;
}