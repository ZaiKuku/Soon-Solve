// "use client";

import { useState } from "react";
// import nookies from "nookies";
// import axios from "axios";
import Image from "next/legacy/image";
import styles from "../styles/task.module.scss";

const data = {
  tasks: [
    {
      id: 1,
      title: "我要便當",
      poster_id: 1,
      created_at: "2023-04-09 22:21:48",
      closed_at: "2023-04-09 22:21:48",
      deadline: "2023-04-10 12:53:05",
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

const titleArray = data.tasks.map((task) => task.title);
const contentArray = data.tasks.map((task) => task.content);
const locationArray = data.tasks.map((task) => task.location);
const nameArray = data.tasks.map((task) => task.name);
const rewardArray = data.tasks.map((task) => task.reward);
const taskVacancyArray = data.tasks.map((task) => task.task_vacancy);
const approvedCountArray = data.tasks.map((task) => task.approved_count);
const statusArray = data.tasks.map((task) => task.status);

const countdown = data.tasks.map((task) => {
  const createdAt = new Date(task.created_at);
  const deadline = new Date(task.deadline);
  return deadline.getTime() - createdAt.getTime();
});

const countdownInDays = countdown.map((diff) =>
  Math.floor(diff / (1000 * 60 * 60 * 24))
);
const formattedCountdownInDays = countdownInDays.map((day) =>
  day < 10 ? `0${day}` : String(day)
);
const countdownInHours = countdown.map((diff) =>
  Math.floor(diff / (1000 * 60 * 60))
);
const hoursRemainder = countdownInHours.map((hours) => hours % 24); // Get remainder after dividing by 60
const formattedCountdownInHours = hoursRemainder.map((hour) =>
  hour < 10 ? `0${hour}` : String(hour)
);
const countdownInSeconds = countdown.map((diff) =>
  Math.floor(diff / (1000 * 60))
); // Convert milliseconds to seconds
const secondsRemainder = countdownInSeconds.map((seconds) => seconds % 60); // Get remainder after dividing by 60
console.log(formattedCountdownInDays);
console.log(formattedCountdownInHours);
console.log(secondsRemainder);

function Task() {
  const [hasApplied, setHasApplied] = useState(false);

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
        <div className={styles.locationTag}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="19"
            viewBox="0 0 16 19"
            fill="none"
          >
            <path
              d="M7.61789 0C3.47589 0 0.132355 3.15067 0.132355 7.05373C0.132355 11.7562 7.61789 18.81 7.61789 18.81C7.61789 18.81 15.1034 11.7562 15.1034 7.05373C15.1034 3.15067 11.7599 0 7.61789 0ZM7.61789 2.35124C10.3875 2.35124 12.6082 4.46737 12.6082 7.05373C12.6082 9.66362 10.3875 11.7562 7.61789 11.7562C4.87319 11.7562 2.62753 9.66362 2.62753 7.05373C2.62753 4.46737 4.87319 2.35124 7.61789 2.35124Z"
              fill="black"
            />
          </svg>
          <div className={styles.location}>{locationArray}</div>
        </div>
        <div className={styles.rewardContainer}>
          <div className={styles.rewardTag}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="19"
              viewBox="0 0 15 19"
              fill="none"
            >
              <path
                d="M5.85514 0V2.34831H3.67039C1.68954 2.34831 0.0291301 3.68685 0.0291301 5.28371V6.45786C0.0291301 8.05472 1.31085 9.36977 3.20431 9.76899L10.6616 11.3189C11.0694 11.4128 11.652 11.9999 11.652 12.3521V13.5263C11.652 13.8551 11.3316 14.1134 10.9238 14.1134H3.64126C3.2917 14.1134 3.02953 14.0194 2.91301 13.9725V11.7651H0V14.1134C0 14.9118 0.582601 15.5928 1.28172 15.9451C1.95171 16.3208 2.79649 16.4617 3.64126 16.4617H5.82601V18.81H8.73902V16.4617H10.9238C12.9337 16.4617 14.565 15.1466 14.565 13.5263V12.3521C14.565 10.7553 13.2833 9.44022 11.3899 9.04101L3.93256 7.49112C3.52474 7.39719 2.94214 6.81011 2.94214 6.45786V5.28371C2.94214 4.95494 3.26257 4.69663 3.67039 4.69663H10.9529C11.2733 4.69663 11.5646 4.79056 11.6812 4.83753V7.04494H14.5942V4.69663C14.5942 3.8982 14.0116 3.21719 13.3124 2.86494C12.6424 2.48921 11.7977 2.34831 10.9529 2.34831H8.76815V0L5.85514 0Z"
                fill="black"
              />
            </svg>
          </div>
          <div className={styles.reward}>{rewardArray}</div>
        </div>
      </div>
      <div className={styles.countdownContainer}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="154"
          height="154"
          viewBox="0 0 154 154"
          fill="none"
        >
          <g filter="url(#filter0_i_2_375)">
            <path
              d="M154 77C154 119.526 119.526 154 77 154C34.4741 154 0 119.526 0 77C0 34.4741 34.4741 0 77 0C119.526 0 154 34.4741 154 77Z"
              fill="white"
            />
          </g>
          <path
            d="M149 77C149 116.765 116.765 149 77 149C37.2355 149 5 116.765 5 77C5 37.2355 37.2355 5 77 5C116.765 5 149 37.2355 149 77Z"
            stroke="url(#paint0_linear_2_375)"
            strokeWidth="10"
          />
          <defs>
            <filter
              id="filter0_i_2_375"
              x="0"
              y="0"
              width="154"
              height="158"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite
                in2="hardAlpha"
                operator="arithmetic"
                k2="-1"
                k3="1"
              />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="shape"
                result="effect1_innerShadow_2_375"
              />
            </filter>
            <linearGradient
              id="paint0_linear_2_375"
              x1="65.065"
              y1="6.93"
              x2="67.375"
              y2="2.0653e-07"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#B15E6C" />
              <stop offset="1" stopColor="#F6E4B6" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
        <div className={styles.countdown}>
          {formattedCountdownInDays}:{formattedCountdownInHours}:
          {secondsRemainder}
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
