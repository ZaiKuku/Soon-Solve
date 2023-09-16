/* eslint-disable no-unused-vars */
import { useState, useEffect, use } from "react";
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
import { useDispatch } from "react-redux";
import { setRoomId } from "@/redux/personChatting";
import useUpdateTaskUpStatus from "@/hooks/useUpdateTaskStatus";

function Task({ task }) {
  const [hasApplied, setHasApplied] = useState();
  const [isTaskAssigner, setIsTaskAssigner] = useState(false);
  const [countdown, setCountdown] = useState([]);
  const [cookies, setCookie] = useCookies(["token"]);
  const userId = cookies?.token?.user.id;
  const userTask = task?.user_task.find((item) => item.taker_id === userId);
  const askCountForCurrentUser = userTask ? userTask.ask_count : null;
  useEffect(() => {
    setIsTaskAssigner(task?.poster_id === userId);
  }, [task?.poster_id, userId]);

  useEffect(() => {
    setIsTaskAssigner(task?.poster_id === userId);
    const userApplied = task?.user_task.some(
      (item) => item.taker_id === userId
    );
    setHasApplied(userApplied);
  }, [task, userId]);

  const dispatch = useDispatch();

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

      if (diff <= 0) {
        handleDelete();
        clearInterval(interval); // If the deadline is passed, we also clear the interval immediately
      } else {
        setCountdown(diff);
      }
    }, 1000);

    return () => clearInterval(interval); // Clear the interval when the component is unmounted
  }, []);

  useEffect(() => {
    if (
      task?.task_vacancy - task?.approved_count === 0 &&
      task?.status === "pending"
    ) {
      const updateTaskStatus = useUpdateTaskUpStatus();
      updateTaskStatus("processing", task.id, cookies.token?.access_token);
    }
  }, [task?.task_vacancy, task?.approved_count]);

  const handleApply = async (values, actions) => {
    // Check if the user has already applied
    const userAppliedTask = task.user_task.find(
      (item) => item.taker_id === userId
    );

    if (userAppliedTask) {
      try {
        const [DeleteReq] = useDeleteApply(
          userAppliedTask.id,
          cookies.token.access_token
        );
        await DeleteReq();
        setHasApplied(false);
        actions.resetForm();
      } catch (error) {
        console.error("Failed to delete application:", error);
      }
    } else {
      try {
        const body = {
          ask_count: values.number_requested,
        };
        await useApply(body, task.id, cookies.token.access_token);
        setHasApplied(true);
      } catch (error) {
        console.error("Failed to apply for the task:", error);
      }
    }
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

  const handleClick = () => {
    let chatRoomId;
    if (task?.poster_id > userId) {
      chatRoomId = `${userId}&${task?.poster_id}`;
    } else {
      chatRoomId = `${task?.poster_id}&${userId}`;
    }

    dispatch(setRoomId(chatRoomId));

    router.push(`/chatRoom/${chatRoomId}`);
  };

  const handleSwitchToProfile = () => {
    router.push(`/profile/${task?.poster_id}`);
  };

  return (
    <div className={styles.taskContainer}>
      <div className={styles.profileStatusContainer}>
        <div className={styles.profileContainer}>
          {task?.picture ? (
            <Link href={`/userProfile/${task?.poster_id}`}>
              <img
                src={task.picture}
                alt="The poster's picture"
                className="hover:scale-150 transition duration-300 ease-in-out w-[47px] h-[47px] rounded-full"
              />
            </Link>
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
          <Link href={`/applicants/${task?.id}`}>
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
              number_requested: askCountForCurrentUser || "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleApply}
          >
            {({ isValid, isSubmitting }) => (
              <Form className={styles.applyTaskContainer}>
                <div className={styles.numberChatContainer}>
                  <div className={styles.numberContainer}>
                    <i className="fa-solid fa-lg fa-clipboard-list" />
                    {hasApplied ? (
                      <div className={styles.number}>
                        {askCountForCurrentUser}
                      </div>
                    ) : (
                      <Field
                        name="number_requested"
                        className={styles.numberInput}
                        placeholder="Number"
                      />
                    )}
                  </div>
                  <button type="button" onClick={handleClick}>
                    <ChatIcon />
                  </button>
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
                  disabled={!isValid || isSubmitting}
                >
                  {hasApplied ? "Cancel" : "Apply"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
}

export default Task;
