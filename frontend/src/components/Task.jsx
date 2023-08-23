/* eslint-disable no-unused-vars */
// "use client";

import { useState, useEffect, use } from "react";
// import nookies from "nookies";
// import axios from "axios";
import Image from "next/legacy/image";
import styles from "../styles/task.module.scss";
import ProgressIndicator from "./ProgressIndicator";
import Tag from "./tags";
import ChatIcon from "@mui/icons-material/Chat";
import { useRouter } from "next/router";
import useApply from "@/hooks/useApply";
import useDeleteApply from "@/hooks/useDeleteApply";
import { useCookies } from "react-cookie";
import Link from "next/link";
import useUpdateTaskStatus from "@/hooks/useUpdateTaskStatus";
import useTaskDelete from "@/hooks/useTaskDelete";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import Alert from "@mui/material/Alert";

function Task({ task }) {
  // console.log(task?.user_task);
  const [hasApplied, setHasApplied] = useState(false);
  const [isTaskAssigner, setIsTaskAssigner] = useState(false);
  const [countdown, setCountdown] = useState([]);
  const [cookies, setCookie] = useCookies(["token"]);
  const userId = cookies?.token?.user.id;
  useEffect(() => {
    setIsTaskAssigner(task?.poster_id === userId);
  }, [task?.poster_id, userId]);
  // Calculate days
  const countdownInDays = Math.floor(countdown / (1000 * 60 * 60 * 24));
  const formattedCountdownInDays =
    countdownInDays < 10 ? `0${countdownInDays}` : String(countdownInDays);

  // Calculate hours
  const hoursRemainder = Math.floor((countdown / (1000 * 60 * 60)) % 24);
  const formattedCountdownInHours =
    hoursRemainder < 10 ? `0${hoursRemainder}` : String(hoursRemainder);

  // Calculate minutes
  const minutesRemainder = Math.floor((countdown / (1000 * 60)) % 60);
  const formattedCountdownInMinutes =
    minutesRemainder < 10 ? `0${minutesRemainder}` : String(minutesRemainder);

  // Calculate seconds
  const secondsRemainder = Math.floor((countdown / 1000) % 60);
  const formattedCountdownInSeconds =
    secondsRemainder < 10 ? `0${secondsRemainder}` : String(secondsRemainder);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const deadline = new Date(task?.deadline);
      const diff = deadline.getTime() - now.getTime();

      setCountdown(diff);
    }, 1000);

    return () => clearInterval(interval); // Clear the interval when the component is unmounted
  }, []);

  const handleApply = (e) => {
    e.preventDefault();
    // console.log(e.target.value);
    console.log("hasApplied", hasApplied);
    if (hasApplied) {
      useDeleteApply(10, cookies.token.access_token);
      setHasApplied(false);
      return;
    }
    setHasApplied(true);
    const body = {
      ask_count: e.target.number_requested.value,
    };
    useApply(body, task.id, cookies.token.access_token);
  };

  const updateTaskStatus = useUpdateTaskStatus();

  const handleCompleteClick = async () => {
    try {
      const updatedTask = await updateTaskStatus(
        "commenting",
        task.id,
        cookies.token.access_token
      );
      if (updatedTask) {
        setHasApplied(false); // Only set to false if the API call succeeds
        console.log("Task status updated successfully:", updatedTask);
        Swal.fire({
          icon: "success",
          title: "Task Completed!",
          text: "The task status has been completed successfully.",
        });
      }
    } catch (error) {
      console.error("Failed to complete the task:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while completing the task.",
      });
    }
  };

  const { deleteTask, isLoading, error } = useTaskDelete();
  const router = useRouter();
  const handleDelete = async () => {
    try {
      await deleteTask(task.id, cookies.token.access_token);
      if (!error) {
        Swal.fire({
          icon: "success",
          title: "Task deleted successfully!",
          text: "You will be redirected to the allTask page.",
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/allTasks");
          }
        });
      } else {
        console.error("Error deleting task:", error);
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  const validationSchema = Yup.object().shape({
    number_requested: Yup.number()
      .integer("Must be an integer")
      .required("Number is required")
      .max(
        task?.task_vacancy - task?.approved_count,
        `The number should be fewer or equal to ${
          task?.task_vacancy - task?.approved_count
        }`
      ),
  });

  return (
    <div className={styles.taskContainer}>
      <div className={styles.profileStatusContainer}>
        <div className={styles.profileContainer}>
          {task.picture ? (
            <img
              src={task.picture}
              alt="The poster's picture"
              className="hover:scale-150 transition duration-300 ease-in-out w-[47px] h-[47px] rounded-full"
            />
          ) : (
            <img
              src="/profile.png"
              alt="The poster's picture"
              className="hover:scale-150 transition duration-300 ease-in-out w-[47px] h-[47px] rounded-full"
            />
          )}
          <div className={styles.userName}>{task?.name}</div>
        </div>
        {hasApplied && task?.status === "pending" && (
          <div className={styles.status}>{task?.status}</div>
        )}
      </div>
      <div className={styles.taskTitle}>{task?.title}</div>
      <div className={styles.taskContent}>{task?.content}</div>
      <div className={styles.locationRewardContainer}>
        <Tag outTag={task?.location} />
        <Tag outTag={task?.reward} icon="fa-solid fa-dollar-sign" />
        <Tag
          outTag={task?.task_vacancy - task?.approved_count}
          icon="fa-solid fa-clipboard-list"
        ></Tag>
      </div>
      <div className={styles.countdownContainer}>
        <ProgressIndicator
          createdAt={task?.created_at}
          deadline={task?.deadline}
        />
        <div className={styles.countdown}>
          {formattedCountdownInDays}:{formattedCountdownInHours}:
          {formattedCountdownInMinutes}:{formattedCountdownInSeconds}
        </div>
      </div>
      {isTaskAssigner && (
        <div className={styles.taskAssignerOnly}>
          <div className={styles.completeDeleteContainer}>
            <button className={styles.delete} onClick={handleDelete}>
              Delete
            </button>
            {task?.task_vacancy === 1 && (
              <button className={styles.complete} onClick={handleCompleteClick}>
                Complete
              </button>
            )}
          </div>
          <Link href={`/applicants/${task.id}`}>
            <button className={styles.applicantsContainer}>
              <Image
                src="/profile.png"
                alt="The poster's picture"
                height={32}
                width={32}
              />
              <div className={styles.applicants}>Applicants</div>
            </button>
          </Link>
        </div>
      )}
      {!isTaskAssigner && (
        <div className={styles.taskApplicantsOnly}>
          <Formik
            initialValues={{
              number_requested: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleApply}
          >
            <Form className={styles.applyTaskContainer} onSubmit={handleApply}>
              <div className={styles.numberChatContainer}>
                <div className={styles.numberContainer}>
                  <i className="fa-solid fa-lg fa-clipboard-list" />
                  <Field
                    name="number_requested"
                    className={styles.numberInput}
                    placeholder="Number"
                  />
                </div>
                <Link href={"/"}>
                  <ChatIcon />
                </Link>
              </div>
              <ErrorMessage name="number_requested">
                {(msg) => (
                  <Alert severity="error">
                    <div>{msg}</div>
                  </Alert>
                )}
              </ErrorMessage>
              <button
                className={hasApplied ? styles.cancelTask : styles.applyTask}
                type="submit"
              >
                {hasApplied ? "Cancel" : "Apply"}
              </button>
            </Form>
          </Formik>
        </div>
      )}
    </div>
  );
}

export default Task;
