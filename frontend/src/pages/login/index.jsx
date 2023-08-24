/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
import { useState } from "react";

import { useRouter } from "next/navigation";

import { useCookies } from "react-cookie";
import useLogIn from "@/hooks/useSignIn";
import useSignUp from "@/hooks/useSignUp";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "../../styles/LoginSignUpPage.module.scss";
import Alert from "@mui/material/Alert";

function LoginSignUpPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [cookie, setCookie] = useCookies(["token"]);
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

    if (isLogin) {
      const response = await useLogIn(userLoginData);
      console.log(response);
      if (response) {
        setCookie("token", response.data, {
          maxAge: 60 * 60,
          path: "/",
        });
        router.push("/");
      }
    } else {
      const response = await useSignUp(userSignUpData);
      console.log(response);
      setIsLogin(true);
    }
    setIsLoading(false);
  };

  const getButtonText = () => {
    if (isLoading && isLogin) {
      return "Loging in...";
    }
    if (isLogin && !isLoading) {
      return "Log in";
    }
    if (isLoading && !isLogin) {
      return "Signing Up...";
    }
    return "Sign Up";
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
      {isLogin ? (
        <div className={styles.Logo}>
          <img src="/Logo.png" alt="logo" className={styles.LogoImg} />
        </div>
      ) : (
        <div className={styles.soonSolve}>Soon Solve</div>
      )}

      {/* <div className={styles.SignUpLogin}>{isLogin ? "Log in" : "Sign Up"}</div> */}
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
                <div className={styles.user}>User Name</div>
                <Field
                  type="text"
                  placeholder="e.g. Chou Chou Hu"
                  name="name"
                  className={styles.userBox}
                  onChange={handleChange}
                />
                <ErrorMessage name="name">
                  {(msg) => (
                    <Alert severity="error">
                      <div className={styles.userError}>{msg}</div>
                    </Alert>
                  )}
                </ErrorMessage>
              </div>
            )}
            <div className={styles.emailContainer}>
              <div className={styles.email}>Email</div>
              <Field
                type="email"
                placeholder="e.g. shirney@appworks.tw"
                name="email"
                className={styles.emailBox}
                onChange={handleChange}
              />
              <ErrorMessage name="email">
                {(msg) => (
                  <Alert severity="error">
                    <div className={styles.emailError}>{msg}</div>
                  </Alert>
                )}
              </ErrorMessage>
            </div>
            <div className={styles.passwordContainer}>
              <div className={styles.password}>Password</div>
              <Field
                type="password"
                name="password"
                className={styles.passwordBox}
                onChange={handleChange}
              />
              <ErrorMessage name="password">
                {(msg) => (
                  <Alert severity="error">
                    <div className={styles.passwordError}>{msg}</div>
                  </Alert>
                )}
              </ErrorMessage>
            </div>
            {!isLogin && (
              <div className={styles.rePasswordContainer}>
                <div className={styles.rePassword}>Password Confirm</div>
                <Field
                  type="password"
                  name="confirmPassword"
                  className={styles.rePasswordBox}
                  onChange={handleChange}
                />
                <ErrorMessage name="confirmPassword">
                  {(msg) => (
                    <Alert severity="error">
                      <div className={styles.rePasswordError}>{msg}</div>
                    </Alert>
                  )}
                </ErrorMessage>
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
          {isLogin ? "Sign Up?" : "Log in"}
        </div>
      </div>
    </div>
  );
}

export default LoginSignUpPage;

export async function getServerSideProps(context) {
  const { req } = context;
  const { token } = req.cookies;
  if (token) {
    return {
      redirect: {
        destination: `/allTasks`,
        permenant: false,
      },
    };
  }
  return {
    props: {},
  };
}
