/* eslint-disable no-unused-vars */
// "use client";

import { useState, useEffect } from "react";
// import nookies from "nookies";
// import axios from "axios";
import Image from "next/legacy/image";
import styles from "../styles/AssignTask.module.scss";
import PlaceIcon from "@mui/icons-material/Place";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import TimerIcon from "@mui/icons-material/Timer";
import RedeemIcon from "@mui/icons-material/Redeem";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

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

  const validationSchema = Yup.object().shape({
    number: Yup.number().integer("Must be an integer").required("Number,"),
    people: Yup.number().integer("Must be an integer").required("People,"),
    title: Yup.string().required("Title,"),
    description: Yup.string().required("Description,"),
    compensation: Yup.string().required("Compensation,"),
    deadlineMonth: Yup.number().required("Month,"),
    deadlineDay: Yup.number().required("Day,"),
    deadlineHour: Yup.number().required("Hour,"),
    deadlineMinute: Yup.number().required("Minute,"),
    location: Yup.string().required("Location,"),
  });

  const handleSubmit = (values, { setSubmitting, errors }) => {
    console.log("handleSubmit triggered");
    setSubmitting(true);
    console.log("submitting");
    // Handle form submission here...
    // E.g., send the data to your server...
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        compensation: "",
        number: "",
        people: "",
        deadlineMonth: "",
        deadlineDay: "",
        deadlineHour: "",
        deadlineMinute: "",
        location: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, handleChange, submitForm, errors }) => (
        <Form className={styles.assignTaskContainer} onSubmit={handleSubmit}>
          <div className={styles.taskTitleContainer}>
            <div className={styles.taskTitle}>Title</div>
            <Field name="title" className={styles.taskTitleInput} />
            {/* <ErrorMessage name="title" component="div" /> */}
          </div>
          <div className={styles.taskDescriptionContainer}>
            <div className={styles.taskDescription}>Description</div>
            <Field name="description" className={styles.taskDescriptionInput} />
            {/* <ErrorMessage name="description" component="div" /> */}
          </div>
          <div className={styles.bigContainer}>
            <div className={styles.deadlineContainer}>
              <div className={styles.deadlineIconContainer}>
                <TimerIcon />
                <div className={styles.deadline}>Deadline</div>
              </div>
              <div className={styles.selectBoxContainer}>
                <Field
                  as="select"
                  name="deadlineMonth"
                  className={styles.selectBox}
                >
                  <option value="" disabled>
                    Month
                  </option>
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </Field>
                {/* <ErrorMessage name="deadlineMonth" component="div" /> */}
                <Field
                  as="select"
                  name="deadlineDay"
                  className={styles.selectBox}
                >
                  <option value="" disabled>
                    Day
                  </option>
                  {Array.from({ length: 31 }, (_, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </Field>
                {/* <ErrorMessage name="deadlineDay" component="div" /> */}
                <Field
                  as="select"
                  name="deadlineHour"
                  className={styles.selectBox}
                >
                  <option value="" disabled>
                    Hour
                  </option>
                  {Array.from({ length: 24 }, (_, i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </Field>
                {/* <ErrorMessage name="deadlineHour" component="div" /> */}
                <Field
                  as="select"
                  name="deadlineMinute"
                  className={styles.selectBox}
                >
                  <option value="" disabled>
                    Minute
                  </option>
                  {Array.from({ length: 60 }, (_, i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </Field>
                {/* <ErrorMessage name="deadlineMinute" component="div" /> */}
              </div>
            </div>
            <div className={styles.compensationContainer}>
              <RedeemIcon />
              <Field
                name="compensation"
                className={styles.compensationInput}
                placeholder="Compensation"
              />
              {/* <ErrorMessage name="compensation" component="div" /> */}
            </div>
            <div className={styles.locationContainer}>
              <PlaceIcon />
              <Field
                as="input"
                type="search"
                name="location"
                placeholder="Location"
                value={values.location}
                onChange={handleChange}
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
              {/* <ErrorMessage name="location" component="div" /> */}
            </div>
            <div className={styles.numberPeopleContainer}>
              <div className={styles.numberContainer}>
                <i className="fa-solid fa-lg fa-clipboard-list" />
                <Field
                  name="number"
                  className={styles.numberInput}
                  placeholder="Number"
                />
                {/* <ErrorMessage name="number" component="div" /> */}
              </div>
              <div className={styles.peopleContainer}>
                <PeopleAltIcon />
                <Field
                  name="people"
                  className={styles.peopleInput}
                  placeholder="People"
                />
                {/* <ErrorMessage name="people" component="div" /> */}
              </div>
            </div>
          </div>
          <button
            type="button"
            className={styles.assignTask}
            onClick={() => {
              submitForm();
              if (Object.keys(errors).length > 0) {
                const errorMessages = Object.values(errors);
                if (errorMessages.length > 0) {
                  const errorMessage = errorMessages.join("\n");
                  console.log(errorMessage);
                  Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    html: errorMessage + " is(are) required",
                    confirmButtonColor: "#B15E6C",
                  });
                }
              }
            }}
          >
            Assign
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default AssignTask;
