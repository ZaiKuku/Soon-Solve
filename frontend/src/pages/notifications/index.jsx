import { Notification } from "@/components/notification";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";

// notifications 包括：好友邀請、任務通過申請、任務完成、聊天室訊息、任務發申請
export default function NotificationsPage() {
  const router = useRouter();
  return (
    <main className="w-full flex flex-col gap-2 items-center py-[80px] h-screen">
      <Header />
      <Notification mode="comments" />
      <Notification mode="task_req" />
      <Notification mode="task_req" />
      <button
        style={{
          position: "absolute",
          bottom: "100px",
          left: "20px",
        }}
        onClick={() => {
          router.back();
        }}
      >
        <ArrowBackIcon style={{ fontSize: "40px" }} />
      </button>
      <NavBar />
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
