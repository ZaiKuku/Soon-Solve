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
import Button from "@mui/material/Button";

function Applicant({ user, onUserDeleted, onUserAccepted, onUserFinished }) {
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

  const [DeletReq] = useDeleteApply(
    user.user_task.id,
    cookies.token.access_token
  );

  const localHandleAccept = async () => {
    console.log("user.user_task.id", user.user_task.id);
    onUserAccepted(user.id, user.user_task.id); // Use the function from the prop
  };

  const handleDelete = async () => {
    console.log("user.user_task.id", user.user_task.id);
    const res = await DeletReq();
    console.log("DeletReq", res);
    onUserDeleted(user.id);
  };

  const localHandleFinish = async () => {
    console.log("user.user_task.id", user.user_task.id);
    onUserFinished(user.id, user.user_task.id); // Use the function from the prop
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
        {user.user_task.status === "pending" && (
          <div className={styles.checkCancelContainer}>
            <button onClick={localHandleAccept}>
              <CheckCircleIcon
                style={{ color: "#4BD37B", fontSize: "40px" }}
                className="hover:scale-150 transition duration-200 ease-out cursor-pointer"
              />
            </button>
            <button onClick={handleDelete}>
              <CancelIcon
                style={{ color: "#FD5154", fontSize: "40px" }}
                className="hover:scale-150 transition duration-200 ease-out cursor-pointer"
              />
            </button>
          </div>
        )}
        {user.user_task.status === "Accepted" && (
          <div className={styles.checkCancelContainer}>
            <Button
              variant="contained"
              color="success"
              onClick={localHandleFinish}
            >
              Finish
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Applicant;
