import Applicant from "@/components/Applicant";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useTaskReqList from "@/hooks/useTaskReqList";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { useCookies } from "react-cookie";
import Alert from "@mui/material/Alert";
import useTaskReqAccept from "@/hooks/useTaskReqAccept";
import useChatContent from "@/hooks/useChatContent";
import { use } from "react";

export default function ApplicantsPage() {
  const router = useRouter();
  const { id } = router.query;
  const [nextCursor, setNextCursor] = useState(0);
  const [dataFetchMode, setDataFetchMode] = useState(""); // ["", "cursor"]
  const [fetchTasks] = useTaskReqList(id);
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

  const usersAccepted = applicants?.filter(
    (user) => user.user_task.status === "Accepted"
  );
  const usersPending = applicants?.filter(
    (user) => user.user_task.status === "pending"
  );

  const handleUserDeleted = (userId) => {
    setApplicants((prev) => prev.filter((user) => user.id !== userId));
  };

  const [AcceptReq] = useTaskReqAccept();
  const [cookies, setCookie] = useCookies(["token"]);
  const handleAccept = async (userId, userTaskId) => {
    const res = await AcceptReq(
      cookies.token.access_token,
      "Accepted",
      userTaskId
    );
    console.log("AcceptReq", res);

    setApplicants((prevApplicants) => {
      return prevApplicants.map((applicant) => {
        if (applicant.id === userId) {
          return {
            ...applicant,
            user_task: {
              ...applicant.user_task,
              status: "Accepted",
            },
          };
        }
        return applicant;
      });
    });
  };
  const handleFinish = async (userId, userTaskId) => {
    const res = await AcceptReq(
      cookies.token.access_token,
      "Finished",
      userTaskId
    );
    console.log("FinishReq", res);

    setApplicants((prevApplicants) => {
      return prevApplicants.map((applicant) => {
        if (applicant.id === userId) {
          return {
            ...applicant,
            user_task: {
              ...applicant.user_task,
              status: "Finished",
            },
          };
        }
        return applicant;
      });
    });
  };

  console.log(applicants);

  return (
    <main className="w-full flex flex-col gap-2 items-center pt-[80px]">
      <Header />
      <Alert severity="success" style={{ fontSize: "18px", width: "210px" }}>
        Confirmed Users
      </Alert>
      <div className="w-[90%] flex flex-col gap-2 justify-center">
        {applicants &&
          usersAccepted.map((user) => (
            <Applicant
              key={user.id}
              user={user}
              onUserDeleted={handleUserDeleted}
              onUserAccepted={handleAccept}
              onUserFinished={handleFinish}
            />
          ))}
      </div>
      <Alert severity="warning" style={{ fontSize: "18px", width: "210px" }}>
        Pending Users
      </Alert>
      <div className="w-[90%] flex flex-col gap-2 justify-center">
        {applicants &&
          usersPending.map((user) => (
            <Applicant
              key={user.id}
              user={user}
              onUserDeleted={handleUserDeleted}
              onUserAccepted={handleAccept}
              onUserFinished={handleFinish}
            />
          ))}
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
