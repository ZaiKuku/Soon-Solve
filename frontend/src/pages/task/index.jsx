// "use client";

import Task from "@/components/Task";
import NavBar from "@/components/NavBar";
import styles from "../../styles/SingleTaskPage.module.scss";
import Header from "@/components/Header";

function SingleTask() {
  return (
    <div className={styles.page}>
      <Header />
      <Task />
      <NavBar />
    </div>
  );
}

export default SingleTask;
