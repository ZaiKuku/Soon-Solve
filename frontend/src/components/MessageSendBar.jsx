import Link from "next/link";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { Input, button } from "@material-tailwind/react";

function MessageSendBar() {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  //   const socket = io();
  //   const returnMessage = {
  //     username: "ZaiKuku",
  //     text: "Hello World",
  //     time: "2021-08-17 16:19:48",
  //   };

  //   useEffect(() => {
  //     // 監聽從伺服器接收的消息
  //     const socket = io.connect("http://localhost:3000", {});
  //     socket.emit("joinRoom", { username: "ZaiKuku", room: "1&2" });

  //     socket.on("message", (message) => {
  //       setMessages((messages) => [...messages, message]);
  //     });

  //     // 清理Socket連接
  //     return () => {
  //       socket.emit("disconnect");
  //       socket.disconnect();
  //     };
  //   }, []);
  const handeleSubmit = (e) => {
    e.preventDefault();

    console.log(e.target.message.value);
    // 清空輸入框
    e.target.message.value = "";
  };

  const sendMessage = () => {
    // 發送消息到伺服器
    const message = {
      id: 1, // 接收者id
      message: messageInput,
    };
    // socket.emit("newMessage", message);
    setMessageInput("");
  };

  return (
    <div className="fixed bottom-0 left-0 w-full h-[83px] flex border-top border-t-2 bg-white border-[#B15E6C] ">
      <form
        className="w-full flex items-center jusfity-center px-10"
        onSubmit={handeleSubmit}
      >
        <Input
          label="Message"
          size="lg"
          className="h-[50px] text-lg"
          name="message"
          icon={
            <button type="submit">
              <i className="fa-solid fa-arrow-right fa-xl" />
            </button>
          }
        />
      </form>
    </div>
  );
}

export default MessageSendBar;
