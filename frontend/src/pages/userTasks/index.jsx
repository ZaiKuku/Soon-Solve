import OverviewGroup from "@/components/OverviewGroup";
import { useState, useEffect } from "react";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import Switcher from "@/components/Switcher";
import useTaskRecord from "@/hooks/useTaskRecord";
import { useSelector, useDispatch } from "react-redux";
import { setIsLoadingTasks } from "@/redux/LoadingControl";
import { Button } from "@material-tailwind/react";
import Link from "next/link";

function userTasks() {
  const [nextCursor, setNextCursor] = useState(0);
  const [postFetchMode, setPostFetchMode] = useState(""); // ["user_id", "cursor", "user_cursor"]
  const [fetchTasks] = useTaskRecord();
  const [tasks, setTasks] = useState();
  const [isLoadMorePosts, setIsLoadMorePosts] = useState(false);

  const dispatch = useDispatch();

  const activeTab = useSelector((state) => state.activeTab.activeTab);
  console.log("tasks", tasks);

  useEffect(() => {
    async function fetchData() {
      setPostFetchMode("");
      dispatch(setIsLoadingTasks(true));
      try {
        setTasks(null);
        const [data, cursor] = await fetchTasks("", null, activeTab);
        console.log("data", data);
        setTasks(data);
        setNextCursor(cursor);
        setPostFetchMode("cursor");
        dispatch(setIsLoadingTasks(false));
      } catch (err) {
        console.error(err);
        dispatch(setIsLoadingTasks(false));
      }
    }

    fetchData();
  }, [activeTab]);

  const updatePosts = async () => {
    if (!nextCursor || isLoadMorePosts) {
      return;
    }
    setIsLoadMorePosts(true);
    console.log("start fetching data");
    const [newData, cursor] = await fetchTasks(
      postFetchMode,
      nextCursor,
      activeTab
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
    <main className="w-full flex flex-col gap-2 items-center py-[120px]">
      <Header />
      <div className="w-[90%] flex flex-col gap-2 items-center">
        <Switcher />
        {activeTab === "Released" && (
          <Link href="/AssignTask" className="w-fit">
            <Button color="black" ripple="light">
              Add
            </Button>
          </Link>
        )}

        <OverviewGroup tasks={tasks} />

        <NavBar />
      </div>
    </main>
  );
}

export default userTasks;

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
