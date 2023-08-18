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

export default function Home() {
  const [nextCursor, setNextCursor] = useState(0);
  const [postFetchMode, setPostFetchMode] = useState(""); // ["user_id", "cursor", "user_cursor"]
  const [fetchTasks] = useTaskSearch();
  const [tasks, setTasks] = useState();
  const [isLoadMorePosts, setIsLoadMorePosts] = useState(false);

  const dispatch = useDispatch();
  const conditionNum = useSelector((state) => state.selectedLocations.num);
  const conditions = useSelector((state) => state.selectedLocations);

  useEffect(() => {
    async function fetchData() {
      // get posts
      // console.log("conditions", conditions);
      setPostFetchMode("");
      try {
        if (conditionNum === 0) {
          const [data, cursor] = await fetchTasks();
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
        // console.log("cursor", cursor);
        setPostFetchMode("cursor");
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, [conditions]);

  useEffect(() => {
    return () => {
      dispatch(cleanAll());
    };
  }, []);

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
    <main className="absolute w-full flex flex-col gap-2 items-center py-24 z-0 ">
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
