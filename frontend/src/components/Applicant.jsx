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
import { useDispatch } from "react-redux";
import { setRoomId } from "@/redux/personChatting";
import { useEffect, useState } from "react";
import { Collapse, Card } from "@mui/material";
import { CommentBoxTextarea } from "./CommentBoxTextarea";

function Applicant({ user, onUserDeleted, onUserAccepted, onUserFinished }) {
  const router = useRouter();
  const taskId = router.query.id;
  const [cookies, setCookie] = useCookies(["token"]);
  const [open, setOpen] = useState(false);
  const [finished, setFinished] = useState(false);

  const dispatch = useDispatch();

  const handleClick = () => {
    const id = cookies.token?.user.id;
    const userId = user.id;
    let chatRoomId;
    if (id > userId) {
      chatRoomId = `${userId}&${id}`;
    } else {
      chatRoomId = `${id}&${userId}`;
    }
    console.log(user);
    dispatch(setRoomId(chatRoomId));

    router.push(`/chatRoom/${chatRoomId}`);
  };

  const [DeletReq] = useDeleteApply(
    user.user_task.id,
    cookies.token.access_token
  );

  const localHandleAccept = async () => {
    onUserAccepted(user.id, user.user_task.id); // Use the function from the prop
  };

  const handleDelete = async () => {
    // console.log("user.user_task.id", user.user_task.id);
    const res = await DeletReq();
    onUserDeleted(user.id);
  };

  const localHandleFinish = async () => {
    setOpen(true);
    setFinished(true);
  };

  useEffect(() => {
    if (finished & !open) {
      onUserFinished(user.id, user.user_task.id);
    }
  }, [open, finished]);

  return (
    <>
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
          <button type="button" onClick={handleClick}>
            <ChatIcon className="hover:scale-150 transition duration-200 ease-out cursor-pointer" />
          </button>
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
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Card className="border-solid  border-2 p-2">
          <CommentBoxTextarea
            setOpen={setOpen}
            taskId={taskId}
            takerId={user.id}
          />
        </Card>
      </Collapse>
    </>
  );
}

export default Applicant;
