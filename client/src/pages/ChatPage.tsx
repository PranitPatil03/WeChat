import ChatBox from "@/components/ChatBox";
import UserChats from "@/components/UserChats";
import SideSearchBar from "@/components/SideSearchBar";
import { chatContext } from "@/context/chatContext";
import { userContext } from "@/context/userContext";
import { useContext } from "react";

const ChatPage = () => {
  const {
    userAuth: { accessToken },
    setUserAuth,
  } = useContext(userContext);

  const { selectChat, setSelectChat, notification, setNotification, chat } =
    useContext(chatContext);

  return (
    <>
      <div className="w-full">
        {accessToken ? <SideSearchBar></SideSearchBar> : null}

        <div className="flex justify-between w-full h-[90vh] p-3">
          {accessToken ? <UserChats></UserChats> : null}

          {accessToken ? <ChatBox></ChatBox> : null}
        </div>
      </div>
    </>
  );
};

export default ChatPage;
