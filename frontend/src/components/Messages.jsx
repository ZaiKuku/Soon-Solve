import { useEffect, useRef } from "react";
import Message from "./Message";
import { useCookies } from "react-cookie";

export default function Messages({ messages }) {
  const chatContainerRef = useRef(null);
  const [cookies] = useCookies(["token"]);
  let scrollHeight;
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      scrollHeight = chatContainerRef.current.scrollHeight;
      const height = chatContainerRef.current.clientHeight;
      console.log("scrollHeight", scrollHeight);
      chatContainerRef.current.scrollTo(0, 500);
      scrollHeight = chatContainerRef.current.scrollHeight;
      console.log("scrollHeight", scrollHeight);
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleClickDown = () => {
    scrollToBottom();
  };
  console.log("messages", messages);
  const messageItems = messages?.map((message) => {
    // console.log("sender.id", message.sender);
    // console.log("user.id", cookies?.token?.user.id);
    return (
      <Message
        key={message.id}
        content={message?.message}
        picture={message.sender_id?.picture}
        self={message.sender_id?.id === cookies?.token?.user.id}
      />
    );
  });

  return (
    <div
      className="flex w-full flex-col-reverse px-3 gap-8 overflow-y-auto"
      ref={chatContainerRef}
    >
      {/* <button onClick={handleClickDown}>down</button> */}
      {messageItems}
    </div>
  );
}
