import Applicant from "@/components/Applicant";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useTaskReqList from "@/hooks/useTaskReqList";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { useSelector } from "react-redux";

export default function ApplicantsPage() {
  const router = useRouter();
  const [nextCursor, setNextCursor] = useState(null);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [data, setData] = useState(null);
  const [fetchData] = useTaskReqList();

  // useEffect(() => {
  //   const fetchTaskReqList = async () => {
  //     const [users, nextCursor] = await fetchData();
  //     setData(users);
  //   };

  //   fetchTaskReqList();
  // }, []);
  const fetchTaskReqList = async (cursor) => {
    console.log("Fetching data with cursor:", cursor);
    const [users, nextCursor] = cursor
      ? await fetchData("cursor", cursor)
      : await fetchData();
    console.log("Received users:", users, "Received nextCursor:", nextCursor);
    if (cursor) {
      setData((prevData) => [...prevData, ...users]);
    } else {
      setData(users);
    }
    setNextCursor(nextCursor);
  };

  const updateApplicants = async () => {
    if (!nextCursor || isLoadMore) {
      return;
    }
    setIsLoadMore(true);
    console.log("start fetching data");
    await fetchTaskReqList(nextCursor);
    setTimeout(() => {
      console.log("finish fetching data");
      setIsLoadMore(false);
    }, 1000);
  };

  useEffect(() => {
    fetchTaskReqList(null);
  }, []);

  useInfiniteScroll(updateApplicants, 100);

  console.log(data);

  return (
    <main className="w-full flex flex-col gap-2 items-center pt-[80px]">
      <Header />
      <div className="w-[90%] flex flex-col gap-2 justify-center">
        {data && data.map((user) => <Applicant key={user.id} user={user} />)}
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
