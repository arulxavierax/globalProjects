import React, { createContext, useState } from "react";

export const ContextApp = createContext();

function AppContexProvider({ children }) {
  let users = JSON.parse(localStorage.getItem("user"));
  const [data, setData] = useState(users);
  return (
    <ContextApp.Provider value={{ data, setData,users }}>
      {children}
    </ContextApp.Provider>
  );
}

export default AppContexProvider;
