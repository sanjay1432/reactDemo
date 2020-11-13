import React, { createContext, useState, useEffect } from "react";
export const GlobalContext = createContext();

export const GlobalProvider = (props) => {
  const [state, setState] = usePersistedState("store");

  return (
    <GlobalContext.Provider value={[state, setState]}>
      {props.children}
    </GlobalContext.Provider>
  );
};
function usePersistedState(key) {
  const [state, setState] = useState(() =>
    localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : null
  );
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
}
