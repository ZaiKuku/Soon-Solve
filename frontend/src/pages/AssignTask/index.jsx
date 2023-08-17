// "use client";

import AssignTask from "@/components/AssignTask";
import NavBar from "@/components/NavBar";
import styles from "../../styles/AssignTaskPage.module.scss";
import Header from "@/components/Header";
import Switcher from "@/components/Switcher";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function AssignTaskPage() {
  return (
    <div className={styles.page}>
      <Header />
      <Switcher />
      <AssignTask />
      <button
        style={{
          position: "absolute",
          bottom: "100px",
          left: "20px",
        }}
        onClick={() => {
          // Handle click event here
        }}
      >
        <ArrowBackIcon style={{ fontSize: "40px" }} />
      </button>
      <NavBar />
    </div>
  );
}

export default AssignTaskPage;
