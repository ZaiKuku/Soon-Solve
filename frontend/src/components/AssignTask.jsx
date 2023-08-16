/* eslint-disable no-unused-vars */
// "use client";

import { useState, useEffect } from "react";
// import nookies from "nookies";
// import axios from "axios";
import Image from "next/legacy/image";
import styles from "../styles/AssignTask.module.scss";
import Tag from "./tags";
import PlaceIcon from "@mui/icons-material/Place";
import NumbersIcon from "@mui/icons-material/Numbers";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import TimerIcon from "@mui/icons-material/Timer";
import RedeemIcon from "@mui/icons-material/Redeem";

const data = {
  tasks: [
    {
      id: 1,
      title: "我要便當",
      poster_id: 1,
      created_at: "2023-08-15 16:19:48",
      closed_at: "2023-04-09 22:21:48",
      deadline: "2023-08-15 17:40:05",
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

const locations = {
  NTU: [
    "管一",
    "管二",
    "舟山基隆路口",
    "活大",
    "二活",
    "新體",
    "舊體",
    "博雅",
    "總圖",
  ],
  NCCU: ["大仁樓", "大智樓", "大勇樓"],
};

function AssignTask() {
  const [search, setSearch] = useState("");
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

  return (
    <div className={styles.assignTaskContainer}>
      <div className={styles.taskTitleContainer}>
        <div className={styles.taskTitle}>Title</div>
        <input className={styles.taskTitleInput}></input>
      </div>
      <div className={styles.taskDescriptionContainer}>
        <div className={styles.taskDescription}>Description</div>
        <input className={styles.taskDescriptionInput}></input>
      </div>
      <div className={styles.bigContainer}>
        <div className={styles.deadlineContainer}>
          <div className={styles.deadlineIconContainer}>
            <TimerIcon />
            <div className={styles.deadline}>Deadline</div>
          </div>
          <div className={styles.selectBoxContainer}>
            <select className={styles.selectBox}>
              <option value="" disabled selected>
                Month
              </option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select className={styles.selectBox}>
              <option value="" disabled selected>
                Day
              </option>
              {Array.from({ length: 31 }, (_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select className={styles.selectBox}>
              <option value="" disabled selected>
                Hour
              </option>
              {Array.from({ length: 24 }, (_, i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
            <select className={styles.selectBox}>
              <option value="" disabled selected>
                Minute
              </option>
              {Array.from({ length: 60 }, (_, i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={styles.compensationContainer}>
          <RedeemIcon />
          <input
            className={styles.compensationInput}
            placeholder="Compensation"
          ></input>
        </div>
        <div className={styles.locationContainer}>
          <PlaceIcon />
          <input
            type="search"
            placeholder="Location"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            list="locations"
            className={styles.locationInput}
          />
          <datalist id="locations">
            {Object.keys(locations).map((key) => {
              return locations[key].map((location, index) => (
                <option key={index} value={location} />
              ));
            })}
          </datalist>
        </div>
        <div className={styles.numberPeopleContainer}>
          <div className={styles.numberContainer}>
            <NumbersIcon />
            <input className={styles.numberInput} placeholder="Number"></input>
          </div>
          <div className={styles.peopleContainer}>
            <PeopleAltIcon />
            <input className={styles.peopleInput} placeholder="People"></input>
          </div>
        </div>
      </div>
      <button className={styles.assignTask}>Assign</button>
    </div>
  );
}

export default AssignTask;
