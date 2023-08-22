import Applicant from "@/components/Applicant";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useTaskReqList from "@/hooks/useTaskReqList";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";

export default function ApplicantsPage() {
  const router = useRouter();
  const [nextCursor, setNextCursor] = useState(0);
  const [dataFetchMode, setDataFetchMode] = useState(""); // ["", "cursor"]
  const [fetchTasks] = useTaskReqList();
  const [applicants, setApplicants] = useState();
  const [isLoadMorePosts, setIsLoadMorePosts] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setDataFetchMode("");
      try {
        setApplicants(null);
        const [data, cursor] = await fetchTasks("", null);
        console.log("data", data);
        setApplicants(data);
        setNextCursor(cursor);
        // console.log("cursor", cursor);
        setDataFetchMode("cursor");
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, []);

  const updatePosts = async () => {
    if (!nextCursor || isLoadMorePosts) {
      return;
    }
    setIsLoadMorePosts(true);
    console.log("start fetching data");
    const [newData, cursor] = await fetchTasks(dataFetchMode, nextCursor);
    setApplicants((prevData) => [...prevData, ...newData]);
    setNextCursor(cursor);
    setTimeout(() => {
      console.log("finish fetching data");
      setIsLoadMorePosts(false);
    }, 1000);
  };

  useInfiniteScroll(updatePosts, 100);

  return (
    <main className="w-full flex flex-col gap-2 items-center pt-[80px]">
      <Header />
      <div className="w-[90%] flex flex-col gap-2 justify-center">
        {applicants &&
          applicants.map((user) => <Applicant key={user.id} user={user} />)}
      </div>
      <button
        style={{
          position: "absolute",
          bottom: "100px",
          left: "20px",
        }}
        onClick={() => router.back()}
        type="button"
      >
        <ArrowBackIcon style={{ fontSize: "40px" }} />
      </button>
      <NavBar />
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
