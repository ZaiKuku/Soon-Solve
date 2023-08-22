import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import Messages from "@/components/Messages";
import { useRouter } from "next/router";
import { Avatar } from "@material-tailwind/react";
import MessageSendBar from "@/components/MessageSendBar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useCookies } from "react-cookie";

const messages = [
  {
    user_id: 1,
    content: "測試測試測試測試測試測試測試",
    created_at: "2023-08-17 16:19:48",
    self: true,
  },
  {
    user_id: 2,
    content: "測試測試測試測試測試測試測試",
    created_at: "2023-08-17 16:19:48",
    self: false,
  },
];
// notifications 包括：好友邀請、任務通過申請、任務完成、聊天室訊息、任務發申請
export default function chatRoom() {
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [cookies, setCookie] = useCookies(["token"]);
  // useEffect(() => {
  //   // 監聽從伺服器接收的消息
  //   const socket = io("https://52.64.240.159", {
  //     extraHeaders: {
  //       Authorization: `Bearer ${cookies?.token?.access_token}`,
  //     },
  //   });
  //   socket.emit("joinRoom", { username: "ZaiKuku", room: "1&2" });

  //   socket.on("message", (message) => {
  //     setMessages((messages) => [...messages, message]);
  //   });

  //   // 清理Socket連接
  //   return () => {
  //     socket.emit("userDisconnect");
  //     socket.disconnect();
  //   };
  // }, []);
  return (
    <main className="w-full flex flex-col gap-4 items-center pt-[80px] min-h-screen h-fit bg-[#EBEBEB] ">
      <Header />
      <div className="w-full flex items-center p-2">
        <ArrowBackIcon style={{ fontSize: "40px" }} />
        <Avatar src="/山道猴子.png" className="ml-10" />
        <p className="text-2xl font-bold ml-4">山道猴子</p>
      </div>
      <Messages messages={messages} />
      <MessageSendBar />
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
