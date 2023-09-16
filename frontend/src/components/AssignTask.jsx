/* eslint-disable no-unused-vars */
// "use client";

import { useState, useEffect } from "react";
import styles from "../styles/AssignTask.module.scss";
import PlaceIcon from "@mui/icons-material/Place";
import TimerIcon from "@mui/icons-material/Timer";
import RedeemIcon from "@mui/icons-material/Redeem";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import useCreateTask from "@/hooks/useCreateTask";
import locations from "@/locations/locations";

function AssignTask() {
  const router = useRouter();

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

    setFormData(data);
    setSubmitting(false);
    router.push("/userTasks");
  };

  const now = new Date();
  const currentMonth = now.getMonth() + 1; // JS months are 0-based, so add 1
  const currentDay = now.getDate();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

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
        <Form className={styles.assignTaskContainer}>
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
                      {i + 1}月
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
                      {i + 1}日
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
                      {i}時
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
                      {i}分
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
