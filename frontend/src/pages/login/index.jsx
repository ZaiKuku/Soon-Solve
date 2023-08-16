/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */

"use client";

import { useState } from "react";
// import axios from "axios";
import { useRouter } from "next/navigation";
// import { setCookie } from "nookies";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "../../styles/LoginSignUpPage.module.scss";

function LoginSignUpPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleModeChange = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = async (values) => {
    setIsLoading(true);
    setErrorMessage("");

    const userSignUpData = {
      name: values.name,
      email: values.email,
      password: values.password,
    };

    const userLoginData = {
      provider: "native",
      email: values.email,
      password: values.password,
    };

    // try {
    //   let response;
    //   if (isLogin) {
    //     response = await axios.post(
    //       `${process.env.NEXT_PUBLIC_API_HOST}/users/signin`,
    //       userLoginData
    //     );
    //     const accessToken = response.data.data.access_token;
    //     const userId = response.data.data.user.id;
    //     setCookie(null, "accessToken", accessToken, {
    //       path: "/", // Cookie path (optional)
    //     });
    //     setCookie(null, "userId", userId, {
    //       path: "/", // Cookie path (optional)
    //     });
    //     router.push("/");
    //   } else {
    //     response = await axios.post(
    //       `${process.env.NEXT_PUBLIC_API_HOST}/users/signup`,
    //       userSignUpData
    //     );
    //     setIsLogin(true);
    //     setIsLoading(false);
    //   }
    // } catch (error) {
    //   console.log("Error:", error);
    //   if (error.response && error.response.status === 403) {
    //     alert("Email or password is wrong. Please try again.");
    //   } else if (error.response && error.response.status >= 500) {
    //     alert(
    //       "Something's wrong. Please try again later or notify our engineering team."
    //     );
    //   }
    //   setErrorMessage("An error occurred. Please try again.");
    //   setIsLoading(false);
    // }
  };

  const getButtonText = () => {
    if (isLoading) {
      return "登入中...";
    }
    if (isLogin) {
      return "登入";
    }
    return "註冊";
  };

  const validationSchema = Yup.object({
    name: !isLogin ? Yup.string().trim().required("Name is required") : null,
    email: Yup.string()
      .trim()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .trim()
      .min(8, "Password should be a minimum of 8 characters")
      .matches(
        /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/,
        "Password must contain a number, lower and uppercase letter"
      )
      .required("Password is required"),
    confirmPassword: !isLogin
      ? Yup.string()
          .oneOf([Yup.ref("password"), null], "Passwords must match")
          .required("Confirm Password is required")
      : null,
  });

  return (
    <div className={styles.LoginSignUpBox}>
      <div className={styles.soonSolve}>Soon Solve</div>
      <div className={styles.SignUpLogin}>{isLogin ? "Login" : "Sign Up"}</div>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange }) => (
          <Form className={styles.forms}>
            {!isLogin && (
              <div className={styles.userContainer}>
                <div className={styles.userNameErrorContainer}>
                  <div className={styles.user}>User Name</div>
                  <ErrorMessage name="name">
                    {(msg) => <div className={styles.userError}>{msg}</div>}
                  </ErrorMessage>
                </div>
                <Field
                  type="text"
                  placeholder="e.g. Chou Chou Hu"
                  name="name"
                  className={styles.userBox}
                  onChange={handleChange}
                />
              </div>
            )}
            <div className={styles.emailContainer}>
              <div className={styles.emailErrorContainer}>
                <div className={styles.email}>Email</div>
                <ErrorMessage name="email">
                  {(msg) => <div className={styles.emailError}>{msg}</div>}
                </ErrorMessage>
              </div>
              <Field
                type="email"
                placeholder="e.g. shirney@appworks.tw"
                name="email"
                className={styles.emailBox}
                onChange={handleChange}
              />
            </div>
            <div className={styles.passwordContainer}>
              <div className={styles.passwordErrorContainer}>
                <div className={styles.password}>Password</div>
                <ErrorMessage name="password">
                  {(msg) => <div className={styles.passwordError}>{msg}</div>}
                </ErrorMessage>
              </div>
              <Field
                type="password"
                name="password"
                className={styles.passwordBox}
                onChange={handleChange}
              />
            </div>
            {!isLogin && (
              <div className={styles.rePasswordContainer}>
                <div className={styles.rePassword}>Password Confirm</div>
                <ErrorMessage name="confirmPassword">
                  {(msg) => <div className={styles.rePasswordError}>{msg}</div>}
                </ErrorMessage>
                <Field
                  type="password"
                  name="confirmPassword"
                  className={styles.rePasswordBox}
                  onChange={handleChange}
                />
              </div>
            )}
            <button
              type="submit"
              className={styles.loginButton}
              disabled={isLoading}
            >
              {getButtonText()}
            </button>
          </Form>
        )}
      </Formik>
      <div className={styles.signUpBox}>
        <div className={styles.member}>
          {isLogin ? "Not a member?" : "Already a member?"}
        </div>
        <div className={styles.signUp} onClick={handleModeChange}>
          {isLogin ? "Sign Up?" : "Login"}
        </div>
      </div>
    </div>
  );
}

export default LoginSignUpPage;
