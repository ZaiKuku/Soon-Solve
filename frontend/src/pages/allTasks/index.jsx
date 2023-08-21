import SearchBar from "@/components/searchBar";
import useTaskSearch from "@/hooks/useTaskSearch";
import OverviewGroup from "@/components/OverviewGroup";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { DrawerDefault } from "@/components/SideFilter";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cleanAll } from "@/redux/locationSlice";
import { useRouter } from "next/router";
import { setSelectedLocations } from "@/redux/locationSlice";

export default function Home() {
  const [nextCursor, setNextCursor] = useState(0);
  const [postFetchMode, setPostFetchMode] = useState(""); // ["user_id", "cursor", "user_cursor"]
  const [fetchTasks] = useTaskSearch();
  const [tasks, setTasks] = useState();
  const [isLoadMorePosts, setIsLoadMorePosts] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const conditionNum = useSelector((state) => state.selectedLocations.num);
  console.log("conditionNum", conditionNum);
  const conditions = useSelector((state) => state.selectedLocations);

  useEffect(() => {
    async function fetchData() {
      setPostFetchMode("");
      try {
        if (conditionNum < 1) {
          const [data, cursor] = await fetchTasks();
          console.log(data);
          setTasks(data);
          setNextCursor(cursor);
          setPostFetchMode("cursor");
          return;
        }
        console.log("conditionsSearch", conditions);
        const [data, cursor] = await fetchTasks("", null, conditions);
        console.log("data", data);
        setTasks(data);
        setNextCursor(cursor);
        setPostFetchMode("cursor");
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, [conditions]);

  const updatePosts = async () => {
    if (!nextCursor || isLoadMorePosts) {
      return;
    }
    setIsLoadMorePosts(true);
    console.log("start fetching data");
    const [newData, cursor] = await fetchTasks(
      postFetchMode,
      nextCursor,
      conditionNum > 0 ? conditions : null
    );
    setTasks((prevData) => [...prevData, ...newData]);
    setNextCursor(cursor);
    setTimeout(() => {
      console.log("finish fetching data");
      setIsLoadMorePosts(false);
    }, 1000);
  };
  useInfiniteScroll(updatePosts, 100);

  return (
    <main className="absolute w-full flex flex-col gap-2 items-center py-24 z-0 min-h-screen">
      <Header />
      <SearchBar />

      <OverviewGroup tasks={tasks} />

      <NavBar />
      <DrawerDefault />
    </main>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const { token } = req.cookies;
  if (!token) {
    return {
      redirect: {
        destination: `/login`,
        permenant: false,
      },
    };
  }
  return {
    props: {},
  };
}
