import Tag from "../tags";
import style from "../../styles/TaskOverviewSkeleton.module.scss";
import { Card } from "@material-tailwind/react";
import { Skeleton } from "@mui/material";

export default function TaskOverviewSkeleton() {
  return (
    <Card className={style.bg}>
      <div className={style.infoContainer}>
        <div className={style.avatarContainer}>
          <Skeleton variant="circular" width={47} height={47} />
        </div>

        <Skeleton variant="text" sx={{ fontSize: "22px" }} width={200} />
      </div>
      <Skeleton
        variant="text"
        sx={{ fontSize: "16px" }}
        width={50}
        className={style.poster}
      />
      <div className={style.location}>
        <Tag />
      </div>
      <div className={style.taskNumber}>
        <Tag icon="fa-solid fa-dollar-sign" />
      </div>
      <div className={style.numReqired}>
        <i className="fa-solid fa-clipboard-list" />
        <Skeleton variant="text" sx={{ fontSize: "16px" }} width={20} />
      </div>

      <div className={style.deadline}>
        <i className="fa-regular fa-clock" />
        <Skeleton variant="text" sx={{ fontSize: "16px" }} width={80} />
      </div>
    </Card>
  );
}
