import TaskOverview from "@/components/TaskOverview";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import Switcher from "@/components/Switcher";

function userTasks() {
  return (
    <main className="w-full flex flex-col gap-2 items-center pt-[80px]">
      <Header />
      <div className="w-[90%] flex flex-col gap-2 ">
        <Switcher />
        <TaskOverview />
        <NavBar />
      </div>
    </main>
  );
}

export default userTasks;
