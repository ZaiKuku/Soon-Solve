import Link from "next/link";
import TaskOverview from "./TaskOverview";
import { useSelector } from "react-redux";
import TaskOverviewSkeleton from "./Skeleton/TaskOverviewSkeleton";
import { useEffect, useState } from "react";
import useDeleteTask from "@/hooks/useDeleteTask";
import { useCookies } from "react-cookie";

export default function OverviewGroup({ tasks, showStatus = false }) {
  const [cookies, setCookie] = useCookies(["token"]);
  const isLoadingTasks = useSelector(
    (state) => state.LoadingControl.isLoadingTasks
  );
  const [taskList, setTaskList] = useState(tasks);
  const [DeleteTask] = useDeleteTask();
  console.log("tasks", tasks);
  useEffect(() => {
    if (!tasks) return;
    const now = new Date();
    const toDelete = tasks.filter(
      (task) => new Date(task.deadline).getTime() < now.getTime()
    );
    setTaskList(
      tasks.filter((task) => new Date(task.deadline).getTime() > now.getTime())
    );
    for (let i = 0; i < toDelete.length; i++) {
      console.log("toDelete", toDelete[i].id);
      DeleteTask(toDelete[i].id, cookies.token?.access_token);
    }
  }, [tasks]);

  const taskOverviewItems =
    taskList &&
    taskList.map((task) => (
      <TaskOverview
        key={task.id}
        task={task}
        showStatus={showStatus}
      ></TaskOverview>
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
