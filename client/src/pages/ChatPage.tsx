import ChatBox from "@/components/ChatBox";
import UserChats from "@/components/UserChats";
import SideSearchBar from "@/components/SideSearchBar";
import { chatContext } from "@/context/chatContext";
import { userContext } from "@/context/userContext";
import { useContext } from "react";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

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
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={20}  minSize={20}>
              {accessToken ? <UserChats></UserChats> : null}
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel>
              {accessToken ? <ChatBox></ChatBox> : null}
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </>
  );
};

export default ChatPage;
