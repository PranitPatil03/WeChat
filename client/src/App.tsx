import { Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { userContext } from "./context/userContext";
import { chatContext } from "./context/chatContext";
import { useEffect, useState } from "react";
import { LookInSession } from "./common/session";
import ChatPage from "./pages/ChatPage";
import Profile from "./components/Profile";

function App() {
  const [userAuth, setUserAuth] = useState({});
  const [selectChat, setSelectChat] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState();

  useEffect(() => {
    const userInSession = LookInSession("user");

    userInSession
      ? setUserAuth(JSON.parse(userInSession))
      : setUserAuth({ accessToken: null });
  }, []);

  return (
    <userContext.Provider value={{ userAuth, setUserAuth }}>
      <chatContext.Provider
        value={{
          selectChat,
          setSelectChat,
          chats,
          setChats,
          notification,
          setNotification,
        }}
      >
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/chats" element={<ChatPage></ChatPage>}></Route>
          <Route path="/profile" element={<Profile></Profile>}></Route>
        </Routes>
      </chatContext.Provider>
    </userContext.Provider>
  );
}

export default App;
