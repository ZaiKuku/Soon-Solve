// "use client";

// import { useState, useRef } from "react";
// import nookies from "nookies";
// import axios from "axios";
import Image from "next/legacy/image";
import styles from "../styles/task.module.scss";

function Task() {
  return (
    <div className={styles.taskContainer}>
      <div className={styles.profileContainer}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="33"
          viewBox="0 0 36 33"
          fill="none"
        >
          <path
            d="M18 0C13.05 0 9 4.57956 9 10.2222C9 15.8649 13.05 20.4444 18 20.4444C22.95 20.4444 27 15.8649 27 10.2222C27 4.57956 22.95 0 18 0ZM8.595 20.4444C3.825 20.6489 0 24.2062 0 28.6222V32.7111H36V28.6222C36 24.2062 32.22 20.6489 27.405 20.4444C24.975 22.9387 21.645 24.5333 18 24.5333C14.355 24.5333 11.025 22.9387 8.595 20.4444Z"
            fill="black"
          />
        </svg>
        <div className={styles.userName}>孔令傑</div>
      </div>
      <div className={styles.taskDescription}>領取活動剩下的雞腿便當</div>
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
          <div className={styles.location}>活大</div>
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
          <div className={styles.reward}>雞腿便當 * 1</div>
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
            stroke-width="10"
          />
          <defs>
            <filter
              id="filter0_i_2_375"
              x="0"
              y="0"
              width="154"
              height="158"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
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
              <stop stop-color="#B15E6C" />
              <stop offset="1" stop-color="#F6E4B6" stop-opacity="0" />
            </linearGradient>
          </defs>
        </svg>
        <div className={styles.countdown}>15:00</div>
      </div>
      <div className={styles.applicantsNumeberContainer}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="23"
          viewBox="0 0 22 23"
          fill="none"
        >
          <path d="M0 0H22V23H0V0Z" fill="white" fill-opacity="0.01" />
          <path
            d="M8.25001 3.83331H5.04168C4.78854 3.83331 4.58334 4.04785 4.58334 4.31248V20.6041C4.58334 20.8688 4.78854 21.0833 5.04168 21.0833H17.875C18.1281 21.0833 18.3333 20.8688 18.3333 20.6041V4.31248C18.3333 4.04785 18.1281 3.83331 17.875 3.83331H14.6667"
            stroke="black"
            stroke-width="1.5"
          />
          <path
            d="M8.25 6.22917V3.83333H10.0606C10.0732 3.83333 10.0833 3.82272 10.0833 3.80961V2.875C10.0833 2.08109 10.6989 1.4375 11.4583 1.4375C12.2177 1.4375 12.8333 2.08109 12.8333 2.875V3.80961C12.8333 3.82272 12.8435 3.83333 12.856 3.83333H14.6667V6.22917C14.6667 6.49381 14.4615 6.70833 14.2083 6.70833H8.70833C8.4552 6.70833 8.25 6.49381 8.25 6.22917Z"
            fill="#2F88FF"
            stroke="black"
            stroke-width="1.5"
          />
        </svg>
        <div className={styles.applicantsNumber}>9/10</div>
      </div>
      <div className={styles.applyTaskContainer}>
        <button className={styles.applyTask}>申請任務</button>
      </div>
    </div>
  );
}

export default Task;
