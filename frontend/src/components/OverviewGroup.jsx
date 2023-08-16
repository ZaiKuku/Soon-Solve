import TaskOverview from "./TaskOverview";

export default function OverviewGroup({ taskData }) {
  const taskOverviewItems = taskData.map((task) => (
    <TaskOverview key={task.id} task={task}>
      {console.log(task)}
    </TaskOverview>
  ));

  return <div>{taskOverviewItems}</div>;
}
