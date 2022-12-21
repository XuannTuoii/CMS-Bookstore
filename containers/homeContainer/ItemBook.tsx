import styles from "./Home.module.scss";
import { ConfirmDialog } from "primereact/confirmdialog";
import { useState, useEffect } from "react";
import { useStore } from "../../store";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";

const ItemBook = ({ item, index }: { item: any; index: number }) => {
  const [login, setLogIn] = useState(false);
  const { getAllBook, listBook, isLoggedIn, user, deleteBook } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      setLogIn(isLoggedIn);
    }
  }, [isLoggedIn]);

  const deleteBookHandler = () => {
    setShowDelete(true);
  };
  const [showDelete, setShowDelete] = useState(false);

  const accept = (slug: any) => {
    deleteBook({
      slug: slug,
      public_id: item.public_id,
    });
  };
  return (
    <>
      <div className={styles.item_book}>
        <div className={styles.item_book_header}>
          <h1>{item.name}</h1>
          {login && (
            <div className={styles.item_book_wrapButton}>
              <a href={`/book/${item.slug}`}>View </a>
              <button id="deleteBtn" onClick={deleteBookHandler}>
                Delete
              </button>
            </div>
          )}
          {!login && <div className={styles.item_book_circle}></div>}
        </div>
        <p className={styles.item_book_author}>( {item.author} )</p>
        <h3 className={styles.item_book_page}>
          {item.pageCount} <span>pages</span>
        </h3>
        <div className={styles.item_book_footer}>
          <p className={styles.item_book_type}>{item.type}</p>
          <span>{item.publishedDate}</span>
        </div>
        {showDelete && (
          <ConfirmDialog
            visible={showDelete}
            onHide={() => setShowDelete(false)}
            message="Are you sure you want to delete this book"
            header="Confirmation"
            icon="pi pi-exclamation-triangle"
            accept={() => accept(item.slug)}
            style={{ fontSize: "1.6rem" }}
          />
        )}
      </div>
    </>
  );
};

export default ItemBook;
