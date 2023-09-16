import Tag from "./tags";
import { useState } from "react";
import style from "../styles/TaskOverview.module.scss";
import Link from "next/link";
import { Card, Chip } from "@material-tailwind/react";
import { useRouter } from "next/router";
import sweetAlert from "sweetalert";

export default function TaskOverview({ task, showStatus }) {
  const {
    poster_id,
    deadline,
    task_vacancy,
    title,
    location,
    reward,
    picture,
    name,
    approved_count,
    status,
  } = task;

  const router = useRouter();

  const status_color = () => {
    if (status === "pending") {
      return "green";
    } else if (status === "processing") {
      return "orange";
    } else if (status === "completed") {
      return "gray";
    } else if (status === "commenting") {
      return "blue";
    }
  };

  const handleClick = () => {
    if (status === "commenting") {
      sweetAlert(
        "Commenting Status",
        "Please wait for the poster to comment",
        "warning"
      );
    } else if (status === "Finished") {
      sweetAlert("Finished Status", "The task has been completed", "success");
    } else {
      router.push(`/task/${task.id}`);
    }
  };

  return (
    <>
      <button onClick={handleClick}>
        <Card className={style.bg}>
          <div className="absolute top-2 right-3">
            <Chip
              variant="ghost"
              color={status_color()}
              size="sm"
              value={status}
            />
          </div>
          <div className={style.infoContainer}>
            <div className={style.avatarContainer}>
              {picture ? (
                <img src={picture} className={style.pic} alt="大頭貼" />
              ) : (
                <img
                  src="/profile.png"
                  className={style.pic}
                  alt="預設大頭貼"
                />
              )}
            </div>
            <span className={style.title}>{title}</span>
          </div>
          <span className={style.poster}>{name}</span>
          <div className={style.location}>
            <Tag outTag={location} />
          </div>

          <div className={style.taskNumber}>
            <Tag outTag={reward} icon="fa-solid fa-dollar-sign" />
          </div>
          <div className={style.numReqired}>
            <i className="fa-solid fa-clipboard-list" />
            <span>{task_vacancy - approved_count}</span>
          </div>

          <div className={style.deadline}>
            <i className="fa-regular fa-clock" />
            <span>{deadline}</span>
          </div>
        </Card>
      </button>
    </>
  );
}
