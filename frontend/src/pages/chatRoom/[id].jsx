import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import Messages from "@/components/Messages";
import { useRouter } from "next/router";
import { Avatar, Button } from "@material-tailwind/react";
import MessageSendBar from "@/components/MessageSendBar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useState, useRef } from "react";
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
  const [profileData, a, b] = useProfile(
    roomId
      ?.split("&")
      .filter((id) => parseInt(id) !== cookies.token?.user.id)[0]
  );

  const avatar = profileData?.picture;
  const chatContainerRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: document.body.scrollHeight });
  }, [messages]);

  useEffect(() => {
    if (!roomId) {
      return;
    }
    setMessages(content);
  }, [roomId, content]);

  useEffect(() => {
    setToken(cookies.token?.access_token);
  }, [cookies.token]);

  useEffect(() => {
    // 監聽從伺服器接收的消息
    if (token !== undefined) {
      socket = io("https://13.237.154.187", {
        extraHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });

      try {
        socket.on("message", (message) => {
          handleChangeMessages(message);
        });
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
    const id = roomId
      ?.split("&")
      .filter((id) => parseInt(id) !== cookies.token?.user.id)[0];
    socket.emit("newMessage", { id: id, message: message });
  };

  const handleChangeMessages = (message) => {
    setMessages((messages) => [message, ...messages]);
  };

  return (
    <main
      className="w-full flex flex-col gap-4 items-center pt-[72px]  pb-[100px] min-h-screen h-fit bg-[#EBEBEB]"
      ref={chatContainerRef}
    >
      <Header />
      <div className="w-screen flex items-center fixed bg-[#EBEBEB] p-2 h-fit z-10">
        <button onClick={handleClick}>
          <ArrowBackIcon style={{ fontSize: "40px" }} />
        </button>
        <Avatar src={avatar || "/profile.png"} className="ml-10" />
        <p className="text-2xl font-bold ml-4">{profileData?.name}</p>
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
