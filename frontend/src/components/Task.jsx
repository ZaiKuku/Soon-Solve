// "use client";

import { useState, useEffect } from "react";
// import nookies from "nookies";
// import axios from "axios";
import Image from "next/legacy/image";
import styles from "../styles/task.module.scss";
import ProgressIndicator from "./ProgressIndicator";
import Tag from "./tags";

const data = {
  tasks: [
    {
      id: 1,
      title: "我要便當",
      poster_id: 1,
      created_at: "2023-08-15 16:19:48",
      closed_at: "2023-04-09 22:21:48",
      deadline: "2023-08-15 16:40:05",
      task_vacancy: 0,
      approved_count: 1,
      content: "動態動態動態動態動態動態動態動態",
      location: "八嘎壓樓",
      reward: "抱抱",
      picture: "https://imgur.com/XXXXX",
      name: "PJ",
      nickname: "pppppjjjjjj",
      status: "applied",
    },
  ],
  next_cursor: "KHEAX0GAFjlPyyqAqTcQOXTLKgIVvshji9AqRmuAGjCDESoLlUrrIn7P",
};

function Task() {
  const [hasApplied, setHasApplied] = useState(false);
  const [countdown, setCountdown] = useState([]);
  const titleArray = data.tasks.map((task) => task.title);
  const contentArray = data.tasks.map((task) => task.content);
  const locationArray = data.tasks.map((task) => task.location);
  const nameArray = data.tasks.map((task) => task.name);
  const rewardArray = data.tasks.map((task) => task.reward);
  const taskVacancyArray = data.tasks.map((task) => task.task_vacancy);
  const approvedCountArray = data.tasks.map((task) => task.approved_count);
  const statusArray = data.tasks.map((task) => task.status);
  const createdAtArray = data.tasks.map((task) => task.created_at);
  const deadlineArray = data.tasks.map((task) => task.deadline);

  const countdownInDays = countdown.map((diff) =>
    Math.floor(diff / (1000 * 60 * 60 * 24))
  );
  const formattedCountdownInDays = countdownInDays.map((day) =>
    day < 10 ? `0${day}` : String(day)
  );

  const countdownInHours = countdown.map((diff) =>
    Math.floor(diff / (1000 * 60 * 60))
  );
  const hoursRemainder = countdownInHours.map((hours) => hours % 24);
  const formattedCountdownInHours = hoursRemainder.map((hour) =>
    hour < 10 ? `0${hour}` : String(hour)
  );

  const countdownInMinutes = countdown.map((diff) =>
    Math.floor(diff / (1000 * 60))
  );
  const minutesRemainder = countdownInMinutes.map((minutes) => minutes % 60);
  const formattedCountdownInMinutes = minutesRemainder.map((minute) =>
    minute < 10 ? `0${minute}` : String(minute)
  );

  const countdownInSeconds = countdown.map((diff) => Math.floor(diff / 1000));
  const secondsRemainder = countdownInSeconds.map((seconds) => seconds % 60);
  const formattedCountdownInSeconds = secondsRemainder.map((second) =>
    second < 10 ? `0${second}` : String(second)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(
        data.tasks.map((task) => {
          const now = new Date();
          const deadline = new Date(task.deadline);
          const diff = deadline.getTime() - now.getTime();
          return diff;
        })
      );
    }, 1000);

    return () => clearInterval(interval); // Clear the interval when the component is unmounted
  }, []);

  return (
    <div className={styles.taskContainer}>
      <div className={styles.profileStatusContainer}>
        <div className={styles.profileContainer}>
          <Image
            src="/profile.png"
            alt="The poster's picture"
            height={36}
            width={33}
          />
          <div className={styles.userName}>{nameArray}</div>
        </div>
        {hasApplied && <div className={styles.status}>{statusArray}</div>}
      </div>
      <div className={styles.taskTitle}>{titleArray}</div>
      <div className={styles.taskContent}>{contentArray}</div>
      <div className={styles.locationRewardContainer}>
        <Tag inTag={locationArray} />
        <Tag outTag={rewardArray} icon="fa-solid fa-dollar-sign" />
      </div>
      <div className={styles.countdownContainer}>
        <ProgressIndicator
          createdAt={createdAtArray}
          deadline={deadlineArray}
        />
        <div className={styles.countdown}>
          {formattedCountdownInDays[0]}:{formattedCountdownInHours[0]}:
          {formattedCountdownInMinutes[0]}:{formattedCountdownInSeconds[0]}
        </div>
      </div>
      <div className={styles.applicantsNumeberContainer}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="23"
          viewBox="0 0 22 23"
          fill="none"
        >
          <path d="M0 0H22V23H0V0Z" fill="white" fillOpacity="0.01" />
          <path
            d="M8.25001 3.83331H5.04168C4.78854 3.83331 4.58334 4.04785 4.58334 4.31248V20.6041C4.58334 20.8688 4.78854 21.0833 5.04168 21.0833H17.875C18.1281 21.0833 18.3333 20.8688 18.3333 20.6041V4.31248C18.3333 4.04785 18.1281 3.83331 17.875 3.83331H14.6667"
            stroke="black"
            strokeWidth="1.5"
          />
          <path
            d="M8.25 6.22917V3.83333H10.0606C10.0732 3.83333 10.0833 3.82272 10.0833 3.80961V2.875C10.0833 2.08109 10.6989 1.4375 11.4583 1.4375C12.2177 1.4375 12.8333 2.08109 12.8333 2.875V3.80961C12.8333 3.82272 12.8435 3.83333 12.856 3.83333H14.6667V6.22917C14.6667 6.49381 14.4615 6.70833 14.2083 6.70833H8.70833C8.4552 6.70833 8.25 6.49381 8.25 6.22917Z"
            fill="#2F88FF"
            stroke="black"
            strokeWidth="1.5"
          />
        </svg>
        <div className={styles.applicantsNumber}>
          {taskVacancyArray}/{approvedCountArray}
        </div>
      </div>
      <div className={styles.applyTaskContainer}>
        <button
          className={hasApplied ? styles.cancelTask : styles.applyTask}
          onClick={() => setHasApplied(!hasApplied)}
        >
          {hasApplied ? "Cancel" : "Apply"}
        </button>
      </div>
      {hasApplied && (
        <div className={styles.chatContainer}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 49 49"
            fill="none"
          >
            <path
              d="M7 36.8239V6.91265C7 4.75175 8.75175 3 10.9126 3H38.3012C40.4622 3 42.2138 4.75175 42.2138 6.91265V26.4759C42.2138 28.6369 40.4622 30.3885 38.3012 30.3885H16.7058C15.5172 30.3885 14.3931 30.9289 13.6505 31.857L9.09037 37.5571C8.39723 38.4236 7 37.9335 7 36.8239Z"
              stroke="#B15E6C"
              strokeWidth="5"
              shapeRendering="crispEdges"
            />
          </svg>
        </div>
      )}
    </div>
  );
}

export default Task;
