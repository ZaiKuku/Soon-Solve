import Tag from "./tags";
import style from "../styles/TaskOverview.module.scss";

export default function TaskOverview() {
  return (
    <div className={style.bg}>
      <div className={style.infoContainer}>
        <div className={style.avatarContainer}>
          <img src={"/個人照片.png"} className={style.pic} alt="大頭貼" />
        </div>
        <span className={style.title}>領取活動剩下的便當</span>
      </div>
      <span className={style.poster}>孔令傑</span>
      <div className={style.location}>
        <Tag outTag="活大" />
      </div>
      <div className={style.reward}>
        <Tag outTag="雞腿便當" icon="fa-solid fa-dollar-sign" />
      </div>
      <div className={style.taskNumber}>
        <Tag outTag="9/10" icon="fa-solid fa-clipboard-list" />
      </div>
      <div className={style.numReqired}>
        <i className="fa fa-people-group" />
        <span>3</span>
      </div>

      <div className={style.deadline}>
        <i className="fa-regular fa-clock" />
        <span>12:30</span>
      </div>
    </div>
  );
}
