import SearchBar from "@/components/searchBar";
import useTaskSearch from "@/hooks/useTaskSearch";
import OverviewGroup from "@/components/OverviewGroup";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { DrawerDefault } from "@/components/SideFilter";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";

export default function Home() {
  const [nextCursor, setNextCursor] = useState(0);
  const [postFetchMode, setPostFetchMode] = useState(""); // ["user_id", "cursor", "user_cursor"]
  const [fetchTasks] = useTaskSearch();
  const [tasks, setTasks] = useState();
  const [isLoadMorePosts, setIsLoadMorePosts] = useState(false);
  useEffect(() => {
    async function fetchData() {
      // get posts
      setPostFetchMode("");
      try {
        const [data, cursor] = await fetchTasks(postFetchMode);
        setTasks(data);
        setNextCursor(cursor);
        console.log("cursor", cursor);
        setPostFetchMode("cursor");
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, []);

  const updatePosts = async () => {
    if (!nextCursor || isLoadMorePosts) {
      return;
    }
    setIsLoadMorePosts(true);
    console.log("postFetchMode", postFetchMode);
    console.log("start fetching data");
    const [newData, cursor] = await fetchTasks(postFetchMode, nextCursor);
    setTasks((prevData) => [...prevData, ...newData]);
    setNextCursor(cursor);
    setTimeout(() => {
      console.log("finish fetching data");
      setIsLoadMorePosts(false);
    }, 1000);
  };

  useInfiniteScroll(updatePosts, 100);

  return (
    <main className="absolute w-full flex flex-col gap-2 items-center pt-24 z-0 ">
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
