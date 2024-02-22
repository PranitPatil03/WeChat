import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { userContext } from "./context/userContext";
import { useState } from "react";

function App() {
  const [userAuth, setUserAuth] = useState({});

  return (
    <userContext.Provider value={{ userAuth, setUserAuth }}>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
      </Routes>
    </userContext.Provider>
  );
}

export default App;
