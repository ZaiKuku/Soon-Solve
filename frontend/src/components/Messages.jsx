import { useEffect, useRef } from "react";
import Message from "./Message";
import { useCookies } from "react-cookie";

export default function Messages({ messages }) {
  const chatContainerRef = useRef(null);
  const [cookies] = useCookies(["token"]);

  const messageItems = messages?.map((message) => {
    return (
      <Message
        key={message.id}
        content={message?.message}
        picture={message?.sender_id?.picture || "/profile.png"}
        self={message?.sender_id?.id === cookies?.token?.user.id}
      />
    );
  });

  return (
    <div
      className="flex w-full flex-col-reverse px-3 gap-8 mt-[80px]"
      // ref={chatContainerRef}
    >
      {messageItems}
    </div>
  );
}
