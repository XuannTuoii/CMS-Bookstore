import Link from "next/link";
import { useEffect, useState } from "react";
import { useStore } from "../../store";
import styles from "./Home.module.scss";
import ItemBook from "./ItemBook";

import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/router";

const HomeContainer = () => {
  const {
    getAllBook,
    listBook,
    user,
    isLoggedIn,
    deleteBook,
    isSuccess,
    success,
    setIsSuccess,
    logout,
  } = useStore();
  const [login, setLogIn] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    role: "",
  });

  const router = useRouter();
  const [arrayBook, setArrayBook] = useState([
    {
      slug: "",
      name: "",
      author: "",
      type: "",
      publishedDate: "",
      pageCount: "",
      description: "",
      imageUrl: "",
    },
  ]);
  useEffect(() => {
    getAllBook();
  }, []);

  useEffect(() => {
    if (user.username) {
      setUserData(user);
    }
  }, [user]);

  useEffect(() => {
    if (listBook.length > 0) {
      setArrayBook(listBook);
    }
  }, [listBook]);

  useEffect(() => {
    setLogIn(isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(success, {
        position: "top-center",
      });
    }
    setIsSuccess(false);
  }, [isSuccess]);

  return (
    <main>
      <div className={styles.header}>
        <h1>
          {login && (
            <>
              Welcome Admin comeback, <span>{userData.username}</span>
            </>
          )}
          {!login && <>Welcome to Library Managerment</>}
        </h1>
      </div>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <h1>Mind-opening, life-changing</h1>
          {login && (
            <>
              <Link href="/addBook">Add book</Link>
              <p
                className={styles.logout_btn}
                onClick={() => {
                  logout();
                  router.push("/");
                }}
              >
                Log out
              </p>
            </>
          )}
          {!login && (
            <>
              <Link href="/login">Login</Link>
              <Link href="/register">Register</Link>
            </>
          )}
        </div>
        <div className={styles.list_book}>
          {arrayBook.map((item, index) => {
            if (item.name)
              return <ItemBook key={index} item={item} index={index} />;
          })}
        </div>
      </div>
    </main>
  );
};

export default HomeContainer;
