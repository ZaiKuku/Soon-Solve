// "use client";
import { SWRConfig } from "swr";
import { useRouter } from "next/router";
import Task from "@/components/Task";
import NavBar from "@/components/NavBar";
import styles from "../../styles/SingleTaskPage.module.scss";
import Header from "@/components/Header";
import useTaskDetails from "@/hooks/useTaskDetails";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function SingleTask() {
  const router = useRouter();
  const { id } = router.query;
  const back = () => {
    router.back();
  };
  // const { task, isLoading } = useTaskDetails(parseInt(id, 10));
  console.log("test");
  return (
    <SWRConfig
      value={{
        onError: () => {
          router.reload();
        },
      }}
    >
      <div className={styles.page}>
        <Header />
        {/* <Task taskData={task} /> */}
        <Task />
        <button
          onClick={back}
          style={{
            position: "absolute",
            bottom: "100px",
            left: "20px",
          }}
        >
          <ArrowBackIcon style={{ fontSize: "40px" }} />
        </button>

        <NavBar />
      </div>
    </SWRConfig>
  );
}

export default SingleTask;
