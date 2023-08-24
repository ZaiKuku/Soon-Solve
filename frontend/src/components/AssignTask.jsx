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
import { useRouter } from "next/router";
import useCreateTask from "@/hooks/useCreateTask";
import locations from "@/locations/locations";

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

function AssignTask() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const now = new Date();
  const currentMonth = now.getMonth() + 1; // JS months are 0-based, so add 1
  const currentDay = now.getDate();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  const validationSchema = Yup.object().shape({
    number: Yup.number().integer("Must be an integer").required("Number,"),
    title: Yup.string().required("Title,"),
    description: Yup.string().required("Description,"),
    compensation: Yup.string().required("Compensation,"),
    deadlineMonth: Yup.number().required("Month,"),
    deadlineDay: Yup.number().required("Day,"),
    deadlineHour: Yup.number().required("Hour,"),
    deadlineMinute: Yup.number().required("Minute,"),
    location: Yup.string().required("Location,"),
    // deadlineMonth: Yup.number()
    //   .min(currentMonth, "Month cannot be in the past")
    //   .required("Month,"),
    // deadlineDay: Yup.number()
    //   .when("deadlineMonth", {
    //     is: (value) => value && value === currentMonth,
    //     then: Yup.number().min(currentDay, "Day cannot be in the past"),
    //     otherwise: Yup.number().min(1).max(31),
    //   })
    //   .required("Day,"),
    // deadlineHour: Yup.number()
    //   .when(["deadlineMonth", "deadlineDay"], {
    //     is: (month, day) =>
    //       month && month === currentMonth && day && day === currentDay,
    //     then: Yup.number().min(currentHour, "Hour cannot be in the past"),
    //     otherwise: Yup.number().min(0).max(23),
    //   })
    //   .required("Hour,"),
    // deadlineMinute: Yup.number()
    //   .when(
    //     ["deadlineMonth", "deadlineDay", "deadlineHour"],
    //     (month, day, hour, schema) => {
    //       if (
    //         month === currentMonth &&
    //         day === currentDay &&
    //         hour === currentHour
    //       ) {
    //         return schema.min(currentMinute, "Minute cannot be in the past");
    //       }
    //       return schema.min(0).max(59);
    //     }
    //   )
    //   .required("Minute,"),
    // location: Yup.string()
    //   .oneOf([].concat(...Object.values(locations)), "Invalid location")
    //   .required("Location,"),
  });

  const [formData, setFormData] = useState(null);
  const { response, error, isLoading } = useCreateTask(formData);

  useEffect(() => {
    if (response) {
      console.log("Task created successfully:", response);
      // Handle success
    } else if (error) {
      console.error("Error creating task:", error);
      // Handle error
    }
  }, [response, error]);

  const handleSubmit = (values, { setSubmitting, errors }) => {
    console.log("handleSubmit triggered");
    setSubmitting(true);
    const data = {
      title: values.title,
      content: values.description,
      reward: values.compensation,
      location: values.location,
      task_vacancy: parseInt(values.number, 10),
      deadline: `2023-${String(values.deadlineMonth).padStart(2, "0")}-${String(
        values.deadlineDay
      ).padStart(2, "0")} ${String(values.deadlineHour).padStart(
        2,
        "0"
      )}:${String(values.deadlineMinute).padStart(2, "0")}:00`,
    };

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
      setSubmitting(false); // Make sure to prevent further operations when there's an error
      return; // Stop the function here
    }

    setFormData(data);
    // router.push("/userTasks");
  };

  // const handleSubmit = async (values, { setSubmitting, resetForm }) => {
  //   setSubmitting(true);
  //   const data = {
  //     title: values.title,
  //     content: values.description,
  //     reward: values.compensation,
  //     location: values.location,
  //     task_vacancy: parseInt(values.number, 10),
  //     deadline: `2023-${String(values.deadlineMonth).padStart(2, "0")}-${String(
  //       values.deadlineDay
  //     ).padStart(2, "0")} ${String(values.deadlineHour).padStart(
  //       2,
  //       "0"
  //     )}:${String(values.deadlineMinute).padStart(2, "0")}:00`,
  //   };

  //   try {
  //     // Assuming the function below makes the actual API call.
  //     // You'll need to define and implement this.
  //     const response = await useCreateTask(data);

  //     console.log("Task created successfully:", response);
  //     // Handle success - for instance, redirecting, showing a message, etc.
  //     router.push("/userTasks");
  //   } catch (error) {
  //     console.error("Error creating task:", error);
  //     // Handle error - for instance, showing a message to the user.
  //   }

  //   setSubmitting(false);
  // };

  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        compensation: "",
        number: "",
        deadlineMonth: currentMonth,
        deadlineDay: currentDay,
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
          </div>
          <div className={styles.taskDescriptionContainer}>
            <div className={styles.taskDescription}>Description</div>
            <Field name="description" className={styles.taskDescriptionInput} />
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
              </div>
              <div className={styles.selectBoxContainer}>
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
              </div>
            </div>
            <div className={styles.compensationContainer}>
              <RedeemIcon />
              <Field
                name="compensation"
                className={styles.compensationInput}
                placeholder="Compensation"
              />
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
            </div>
            <div className={styles.numberPeopleContainer}>
              <div className={styles.numberContainer}>
                <i className="fa-solid fa-lg fa-clipboard-list" />
                <Field
                  name="number"
                  className={styles.numberInput}
                  placeholder="Number"
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className={styles.assignTask}
            // onClick={() => {
            //   console.log(submitForm);
            //   submitForm();
            //   if (Object.keys(errors).length > 0) {
            //     const errorMessages = Object.values(errors);
            //     if (errorMessages.length > 0) {
            //       const errorMessage = errorMessages.join("\n");
            //       console.log(errorMessage);
            //       Swal.fire({
            //         icon: "error",
            //         title: "Oops...",
            //         html: errorMessage + " is(are) required",
            //         confirmButtonColor: "#B15E6C",
            //       });
            //     }
            //   }
            // }}
          >
            Create
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default AssignTask;

export async function getServerSideProps(context) {
  const { req } = context;
  const { token } = req.cookies;
  if (!token) {
    return {
      redirect: {
        destination: `/login`,
        permenant: false,
      },
    };
  }
  return {
    props: {},
  };
}
