/* eslint-disable no-unused-vars */
// "use client";

import { useState, useEffect } from "react";
// import nookies from "nookies";
// import axios from "axios";
import Image from "next/legacy/image";
import styles from "../styles/task.module.scss";
import ProgressIndicator from "./ProgressIndicator";
import Tag from "./tags";
import ChatIcon from "@mui/icons-material/Chat";

const data = {
  tasks: [
    {
      id: 1,
      title: "我要便當",
      poster_id: 1,
      created_at: "2023-08-17 16:19:48",
      closed_at: "2023-04-09 22:21:48",
      deadline: "2023-08-17 16:45:05",
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

function Task({ taskData }) {
  const [hasApplied, setHasApplied] = useState(false);
  const [isTaskAssigner, setIsTaskAssigner] = useState(false);
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
            height={47}
            width={47}
          />
          <div className={styles.userName}>{nameArray}</div>
        </div>
        {hasApplied && <div className={styles.status}>{statusArray}</div>}
      </div>
      <div className={styles.taskTitle}>{titleArray}</div>
      <div className={styles.taskContent}>{contentArray}</div>
      <div className={styles.locationRewardContainer}>
        <Tag outTag={locationArray} />
        <Tag outTag={rewardArray} icon="fa-solid fa-dollar-sign" />
        <Tag outTag={taskVacancyArray} icon="fa-solid fa-clipboard-list"></Tag>
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
      {isTaskAssigner && (
        <div className={styles.taskAssignerOnly}>
          <div className={styles.completeDeleteContainer}>
            <button
              className={styles.delete}
              onClick={() => setHasApplied(!hasApplied)}
            >
              Delete
            </button>
            <button
              className={styles.complete}
              onClick={() => setHasApplied(!hasApplied)}
            >
              Complete
            </button>
          </div>
          <button className={styles.applicantsContainer}>
            <Image
              src="/profile.png"
              alt="The poster's picture"
              height={32}
              width={32}
            />
            <div className={styles.applicants}>Applicants</div>
          </button>
        </div>
      )}
      {!isTaskAssigner && (
        <div className={styles.taskApplicantsOnly}>
          <div className={styles.applyTaskContainer}>
            <div className={styles.numberChatContainer}>
              <div className={styles.numberContainer}>
                <i className="fa-solid fa-lg fa-clipboard-list" />
                <input
                  className={styles.numberInput}
                  placeholder="Number"
                ></input>
              </div>
              <button>
                <ChatIcon />
              </button>
            </div>
            <button
              className={hasApplied ? styles.cancelTask : styles.applyTask}
              onClick={() => setHasApplied(!hasApplied)}
            >
              {hasApplied ? "Cancel" : "Apply"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Task;
