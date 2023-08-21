import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import Messages from "@/components/Messages";
import { useRouter } from "next/router";
import { Avatar } from "@material-tailwind/react";
import MessageSendBar from "@/components/MessageSendBar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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
  return (
    <main className="w-full flex flex-col gap-4 items-center pt-[80px] h-fit bg-[#EBEBEB] ">
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
