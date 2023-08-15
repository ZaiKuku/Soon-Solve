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
      <div className={styles.backContainer}>
        <buuton>
          <i className="fa fa-arrow-left fa-2xl"></i>
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="40"
            viewBox="0 0 30 40"
            fill="none"
          >
            <g filter="url(#filter0_d_2_405)">
              <path
                d="M19.9333 0L4 15.9333L19.9333 31.8667L25.9083 25.8917L15.95 15.9333L25.9083 5.975L19.9333 0Z"
                fill="black"
              />
            </g>
            <defs>
              <filter
                id="filter0_d_2_405"
                x="0"
                y="0"
                width="29.9083"
                height="39.8667"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_2_405"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_2_405"
                  result="shape"
                />
              </filter>
            </defs>
          </svg> */}
        </buuton>
      </div>
      <NavBar />
    </div>
  );
}

export default SingleTask;
