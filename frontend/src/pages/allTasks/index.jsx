import SearchBar from "@/components/searchBar";
// import TaskOverview from "@/components/TaskOverview";
import OverviewGroup from "@/components/OverviewGroup";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
// import Tag from "@/components/tags";

export default function Home() {
  const taskData = {
    tasks: [
      {
        id: 1,
        poster_id: 1,
        created_at: "2023-04-09 22:21:48",
        closed_at: "2023-04-09 22:21:48",
        deadline: "2023-04-09 22:21:48",
        task_vacancy: 0,
        approved_count: 1,
        title: "我要便當",
        location: "八嘎壓樓",
        reward: "抱抱",
        picture: "https://imgur.com/XXXXX",
        name: "PJ",
        nickname: "pppppjjjjjj",
        status: "applied",
        sex: 0,
      },
    ],
    next_cursor: "KHEAX0GAFjlPyyqAqTcQOXTLKgIVvshji9AqRmuAGjCDESoLlUrrIn7P",
  };

  return (
    <main className="w-full flex flex-col gap-2 items-center pt-[80px]">
      <Header />
      <SearchBar />
      <OverviewGroup taskData={taskData.tasks} />

      <NavBar />
    </main>
  );
}
