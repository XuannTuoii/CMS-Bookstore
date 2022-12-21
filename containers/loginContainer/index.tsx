import Head from "next/head";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useStore } from "../../store";
import styles from "./Login.module.scss";
import Link from "next/link";
import Image from "next/image";

const LoginContainer = () => {
  const { login, isError, setIsError, errorMessage } = useStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const handleClick = () => {
    if (email.trim() == "" || !email.includes("@gmail.com")) {
      setErrorEmail("Email không đúng định dạng, vd: x@gmail.com");
      return;
    }
    if (password.trim() == "" || password.includes(" ")) {
      setErrorPassword("Mật khẩu không được chứa khoảng trắng ");
      return;
    }
    login({
      email,
      password,
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
          <div className={styles.wrapper}>
            <div className={styles.login_box}>
              <p className={styles.login_desc}>Welcome back !!</p>
              <h1 className={styles.login_title}>Sign in</h1>
              <div className={styles.form_group}>
                <label htmlFor="exampleInputEmail1">Email</label>
                <input
                  onChange={(e) => {
                    setErrorEmail("");
                    setEmail(e.target.value);
                  }}
                  type="email"
                  className={styles.email}
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
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
                  Sign in
                </button>
                <div className={styles.register}>
                  <p>I don’t have an account ?</p>
                  <Link href="/register">Sign up</Link>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.rightDiv}></div>

          <div className={styles.bg_img}>
            <Image src="/bg.png" alt="bg" width="730" height="740" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginContainer;
