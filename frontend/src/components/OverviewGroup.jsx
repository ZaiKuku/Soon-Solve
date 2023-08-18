import Link from "next/link";
import TaskOverview from "./TaskOverview";

export default function OverviewGroup({ tasks }) {
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
    </div>
  );
}
