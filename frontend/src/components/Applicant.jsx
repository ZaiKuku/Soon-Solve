import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Applicant.module.scss";
import ChatIcon from "@mui/icons-material/Chat";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import useDeleteApply from "@/hooks/useDeleteApply";
import useTaskReqAccept from "@/hooks/useTaskReqAccept";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";

function Applicant({ user }) {
  console.log(user);
  const router = useRouter();
  const [cookies, setCookie] = useCookies(["token"]);

  const handleClick = () => {
    const id = cookies.token?.user.id;
    const userId = user.id;
    let chatRoomId;
    console("id", id);
    console("userId", userId);
    if (id > userId) {
      chatRoomId = `${userId}&${id}`;
    } else {
      chatRoomId = `${id}&${userId}`;
    }
    // router.push(`/chatRoom/${chatRoomId}`);
  };

  const [DeletReq] = useDeleteApply();
  const [AcceptReq] = useTaskReqAccept();

  const handleAccept = async () => {
    console.log("user.user_task.id", user.user_task.id);
    const res = await AcceptReq(
      cookies.token.access_token,
      "Accepted",
      user.user_task.id
    );
    console.log("AcceptReq", res);
  };

  const handleDelete = async () => {
    console.log("user.user_task.id", user.user_task.id);
    const res = await DeletReq(cookies.token.access_token, user.user_task.id);
    console.log("DeletReq", res);
  };

  return (
    <div className={styles.applicantContainer}>
      <Link href={`/profile/${user.id}`}>
        <Image
          src={user.picture || "/profile.png"}
          width={50}
          height={50}
          className="rounded-full hover:scale-150 transition duration-200 ease-out cursor-pointer"
        />
      </Link>
      <div className={styles.nameTitleContainer}>
        <div className={styles.applicantName}>{user.name}</div>
      </div>
      <div className={styles.container}>
        <Link href={`/chatRoom/${user.id}`}>
          <ChatIcon className="hover:scale-150 transition duration-200 ease-out cursor-pointer" />
        </Link>
        <div className={styles.numberContainer}>
          <i className="fa-solid fa-xl fa-clipboard-list" />
          <div className={styles.number}>{user.user_task.ask_count}</div>
        </div>
        <div className={styles.checkCancelContainer}>
          <button onClick={handleAccept}>
            <CheckCircleIcon
              style={{ color: "#4BD37B", fontSize: "40px" }}
              className="hover:scale-150 transition duration-200 ease-out cursor-pointer"
            />
          </button>
          <button onClick={handleDelete}>
            <CancelIcon
              style={{ color: "#FD5154", fontSize: "40px" }}
              className="hover:scale-150 transition duration-200 ease-out cursor-pointer"
              onclick={handleDelete}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Applicant;
