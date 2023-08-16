import SearchBar from "@/components/searchBar";
import useTaskSearch from "@/hooks/useTaskSearch";
import OverviewGroup from "@/components/OverviewGroup";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { DrawerDefault } from "@/components/SideFilter";
import { LocationList } from "@/components/LocationList";
import {LocationFilter} from "@/components/locationFilter";

export default function Home() {
  // const { mutate, isLoading, isEnd, size, setSize, task_Data } =
  //   useTaskSearch();
  // useInfiniteScroll(async () => setSize(size + 1), 200);
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
    <main className="w-full flex flex-col gap-2 items-center pt-20">
      <Header />
      <SearchBar />
      <OverviewGroup taskData={taskData.tasks} />
      <NavBar />
      <DrawerDefault />
    </main>
  );
}
