import OverviewGroup from "@/components/OverviewGroup";
import { useState, useEffect } from "react";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import Switcher from "@/components/Switcher";
import useTaskRecord from "@/hooks/useTaskRecord";

function userTasks() {
  const [nextCursor, setNextCursor] = useState(0);
  const [postFetchMode, setPostFetchMode] = useState(""); // ["user_id", "cursor", "user_cursor"]
  const [fetchTasks] = useTaskRecord();
  const [tasks, setTasks] = useState();
  const [isLoadMorePosts, setIsLoadMorePosts] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setPostFetchMode("");
      try {
        const [data, cursor] = await fetchTasks("", null);
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
  }, []);

  console.log(tasks);

  const updatePosts = async () => {
    if (!nextCursor || isLoadMorePosts) {
      return;
    }
    setIsLoadMorePosts(true);
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
    <main className="w-full flex flex-col gap-2 items-center pt-[120px]">
      <Header />
      <div className="w-[90%] flex flex-col gap-2 ">
        <Switcher />
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
