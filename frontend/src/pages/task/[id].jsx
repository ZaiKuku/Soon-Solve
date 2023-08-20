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

  // const { task, isLoading } = useTaskDetails();

  const back = () => {
    router.back();
  };
  const { task, isLoading } = useTaskDetails(parseInt(id, 10));

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
        <Task task={task} />
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
