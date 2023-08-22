import Applicant from "@/components/Applicant";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useTaskReqList from "@/hooks/useTaskReqList";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function ApplicantsPage() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [fetchData] = useTaskReqList();

  useEffect(() => {
    const fetchTaskReqList = async () => {
      const [users, nextCursor] = await fetchData();
      setData(users);
    };

    fetchTaskReqList();
  }, []);
  console.log(data);

  return (
    <main className="w-full flex flex-col gap-2 items-center pt-[80px]">
      <Header />
      <div className="w-[90%] flex flex-col gap-2 justify-center">
        <Applicant />
        {/* {data && data.map((user) => <Applicant key={user.id} user={user} />)} */}
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
