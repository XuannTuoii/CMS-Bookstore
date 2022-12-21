/* eslint-disable @next/next/no-html-link-for-pages */
import Head from "next/head";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useStore } from "../../store";
import styles from "./Register.module.scss";
import Image from "next/image";
import Link from "next/link";
const RegisterContainer = () => {
  const { register, isError, setIsError, errorMessage } = useStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorUsername, setErrorUsername] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const handleClick = () => {
    if (username.trim() == "") {
      setErrorUsername("Username khong duoc de trong");
      return;
    }
    if (email.trim() == "" || !email.includes("@gmail.com")) {
      setErrorEmail("Email không đúng định dạng, vd: x@gmail.com");
      return;
    }
    if (password.trim() == "" || password.includes(" ")) {
      setErrorPassword("Mật khẩu không được chứa khoảng trắng ");
      return;
    }

    register({
      email,
      password,
      username,
    });
  };

  //Show Error Message
  useEffect(() => {
    if (isError) {
      toast.error(errorMessage, {
        position: "top-center",
      });
    }
    setIsError(false);
  }, [isError]);

  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>Library Managerment</title>
      </Head>
      <main>
        <div className={styles.container}>
          <div className={styles.bg_img}>
            <Image
              src="/logout.png"
              alt="search img"
              width="477"
              height="477"
            />
          </div>
          <div className={styles.leftDiv}></div>
          <div className={styles.wrapper}>
            <h1 className={styles.logout_title}>Sign up</h1>
            <div className={styles.form_group}>
              <label htmlFor="exampleInputPassword1">Username</label>
              <input
                onChange={(e) => {
                  setErrorUsername("");
                  setUsername(e.target.value);
                }}
                type="email"
                className={styles.password}
                id="exampleInputPassword1"
              />
            </div>
            <div
              className={`${styles.error_message_wrapper} ${
                errorUsername && styles.error_message_wrapper_active
              }`}
            >
              <p className={`${styles.error_message}`}>{errorUsername}</p>
            </div>
            <div className={styles.form_group}>
              <label htmlFor="exampleInputEmail1">Email </label>
              <input
                type="text"
                className={styles.email}
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={(e) => {
                  setErrorEmail("");
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div
              className={`${styles.error_message_wrapper} ${
                errorEmail && styles.error_message_wrapper_active
              }`}
            >
              <p className={`${styles.error_message}`}>{errorEmail}</p>
            </div>
            <div className={styles.form_group}>
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                onChange={(e) => {
                  setErrorPassword("");
                  setPassword(e.target.value);
                }}
                type="password"
                className={styles.password}
                id="exampleInputPassword1"
              />
            </div>
            <div
              className={`${styles.error_message_wrapper} ${
                errorPassword && styles.error_message_wrapper_active
              }`}
            >
              <p className={`${styles.error_message}`}>{errorPassword}</p>
            </div>

            <div className={styles.wrapper_regist}>
              <button className={styles.btn} onClick={handleClick}>
                Sign up
              </button>
              <div className={styles.register}>
                <p>You already have account?</p>
                <Link href="/login">Login</Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RegisterContainer;
