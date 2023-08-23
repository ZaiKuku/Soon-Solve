import Link from "next/link";
import TaskOverview from "./TaskOverview";
import { useSelector } from "react-redux";
import TaskOverviewSkeleton from "./Skeleton/TaskOverviewSkeleton";

export default function OverviewGroup({ tasks }) {
  const isLoadingTasks = useSelector(
    (state) => state.LoadingControl.isLoadingTasks
  );
  console.log("isLoadingTasks", isLoadingTasks);
  const taskOverviewItems =
    tasks &&
    tasks.map((task) => (
      <Link href={`/task/${task.id}`} key={task.id}>
        <TaskOverview key={task.id} task={task}></TaskOverview>
      </Link>
    ));

  return (
    <div className="flex flex-col items-center gap-2 z-1 relative">
      {taskOverviewItems}
      {isLoadingTasks && <TaskOverviewSkeleton />}
      {isLoadingTasks && <TaskOverviewSkeleton />}
      {isLoadingTasks && <TaskOverviewSkeleton />}
      {isLoadingTasks && <TaskOverviewSkeleton />}
    </div>
  );
}
