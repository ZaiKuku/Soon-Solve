import Tag from "./tags";
import style from "../styles/TaskOverview.module.scss";
import Link from "next/link";

export default function TaskOverview({ task }) {
  const {
    poster_id,
    deadline,
    task_vacancy,
    // applied_count,
    title,
    location,
    reward,
    picture,
    name,
    approved_count,
    // nickname,
    // sex,
  } = task;

  return (
    <div className={style.bg}>
      <div className={style.infoContainer}>
        <div className={style.avatarContainer}>
          {picture ? (
            <img src={picture} className={style.pic} alt="大頭貼" />
          ) : (
            <img src="/profile.png" className={style.pic} alt="預設大頭貼" />
          )}
        </div>
        <span className={style.title}>{title}</span>
      </div>
      <span className={style.poster}>{name}</span>
      <div className={style.location}>
        <Tag outTag={location} />
      </div>
      <div className={style.reward}>
        <Tag outTag={reward} icon="fa-solid fa-dollar-sign" />
      </div>
      <div className={style.taskNumber}>
        <Tag outTag={task_vacancy} icon="fa-solid fa-clipboard-list" />
      </div>
      <div className={style.numReqired}>
        <i className="fa fa-people-group" />
        <span>{approved_count}</span>
      </div>

      <div className={style.deadline}>
        <i className="fa-regular fa-clock" />
        <span>{deadline}</span>
      </div>
    </div>
  );
}
