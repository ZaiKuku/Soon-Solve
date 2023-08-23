import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import Messages from "@/components/Messages";
import { useRouter } from "next/router";
import { Avatar, Button } from "@material-tailwind/react";
import MessageSendBar from "@/components/MessageSendBar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useCookies } from "react-cookie";
import useChatContent from "@/hooks/useChatContent";
import { useSelector } from "react-redux";
import useProfile from "@/hooks/useProfile";

let socket;
// notifications 包括：好友邀請、任務通過申請、任務完成、聊天室訊息、任務發申請
export default function chatRoom() {
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [cookies] = useCookies(["token"]);
  const [token, setToken] = useState(cookies.token?.access_token);
  const roomId = router.query.id;

  const { content, isLoading } = useChatContent(roomId);
  const [profileData, a, b] = useProfile(roomId?.split("&")[1]);
  const avatar = profileData?.picture;

  useEffect(() => {
    if (!roomId) {
      return;
    }
    setMessages(content);
    console.log("content", messages);
  }, [roomId, content]);

  useEffect(() => {
    setToken(cookies.token?.access_token);
  }, [cookies.token]);

  useEffect(() => {
    // 監聽從伺服器接收的消息
    if (token !== undefined) {
      socket = io("https://52.64.240.159", {
        extraHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });

      try {
        socket.on("message", (message) => {
          console.log("message", message);
          handleChangeMessages(message);
        });
        console.log("roomId", roomId);
        console.log("name", cookies.token.user);
        socket.emit("joinRoom", {
          username: "ZaiKuku",
          room: roomId,
        });
      } catch (err) {
        console.error(err);
      }
    }
    return () => {
      socket.disconnect();
    };
  }, [token]);

  const handleClick = () => {
    socket.disconnect();
    router.back();
  };

  const handleSendMessage = (message) => {
    const id = roomId.split("&")[1];
    socket.emit("newMessage", { id: id, message: message });
  };

  const handleChangeMessages = (message) => {
    setMessages((messages) => [message, ...messages]);
  };

  return (
    <main className="w-full flex flex-col gap-4 items-center pt-[72px]  pb-[100px] min-h-screen h-fit bg-[#EBEBEB] overflow-hidden">
      <Header />
      <div className="w-screen flex items-center fixed bg-[#EBEBEB] p-2 h-fit z-10">
        <button onClick={handleClick}>
          <ArrowBackIcon style={{ fontSize: "40px" }} />
        </button>
        <Avatar src={avatar || "./山道猴子.png"} className="ml-10" />
        <p className="text-2xl font-bold ml-4">山道猴子</p>
      </div>

      {!isLoading && <Messages messages={messages} />}
      <MessageSendBar handleSendMessage={handleSendMessage} />
    </main>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const { token } = req.cookies;
  if (!token) {
    return {
      redirect: {
        destination: `/login`,
        permenant: false,
      },
    };
  }
  return {
    props: {},
  };
}
