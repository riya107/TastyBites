import { useState } from "react";
import AppContext from "./AppContext";

const AppState = (props) => {
  const [user, setUser] = useState(null);
  const [sideBarState, setSideBarState] = useState("close");

  return (
    <AppContext.Provider value={{ user, setUser, sideBarState, setSideBarState}}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
