import { Route, Routes } from "react-router-dom";
import SignUp from "./components/Signup";
import Login from "./components/Login";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navbar></Navbar>}>
        <Route path="/" element={<SignUp></SignUp>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
      </Route>
    </Routes>
  );
}

export default App;
