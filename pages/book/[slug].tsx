import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useStore } from "../../store";
import styles from "./Detail.module.scss";

import { IoArrowBackSharp } from "react-icons/io5";
import DetailBook from "../../containers/Detailbook";
import { Box } from "@mui/system";
import Header from "../../containers/Header";

const Post = () => {
  const router = useRouter();
  const { slug } = router.query;

  const {
    book,
    listComment,
    getABook,
    isLoggedIn,
    updateBook,
    setIsSuccess,
    success,
    isSuccess,
    isError,
    errorMessage,
    user,
    setIsError,
    getAllComment,
  } = useStore(); // useStore make re-render

  const [slugBook, setSlugBook] = useState("");
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [type, setType] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [pageCount, setPageCount] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [fileInputState, setFileInputState] = useState("");

  const [ableToEdit, setAbleToEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [hiddenEdit, setHidenEdit] = useState(false);
  const [arrOfCmt, setArrOfCmt] = useState([]);
  const [login, setLogIn] = useState(false);

  const [userData, setUserData] = useState({
    username: "",
    role: "",
  });

  useEffect(() => {
    if (user.username) {
      setUserData(user);
    }
  }, [user]);

  useEffect(() => {
    if (isLoggedIn) {
      setLogIn(true);
    }
  }, [isLoggedIn]);

  const [itemBook, setItemBook] = useState({
    slug: "",
    name: "",
    author: "",
    type: "",
    publishedDate: "",
    pageCount: "",
    description: "",
    imageUrl: "",
  });

  let arrType = [
    "Trinh thám",
    "Tiểu thuyết",
    "Phưu lưu",
    "Ma thuật",
    "Truyện tranh",
    "Thám hiểm",
    "Giải trí",
    "Self-help",
    "Kinh doanh",
    "Khoa học",
    "Tâm lý",
    "Tôn giáo",
  ];

  useEffect(() => {
    // const { slug } = router.query;
    if (slug) {
      getABook({
        slug: slug,
      });
      getAllComment({
        slug: slug,
      });
    }
  }, [slug]);

  useEffect(() => {
    if (book) {
      setSlugBook(book.slug);
      setName(book.name);
      setAuthor(book.author);
      setType(book.type);
      setPublishedDate(book.publishedDate);
      setPageCount(book.pageCount);
      setDescription(book.description);
      setImageUrl(book.img_url);
      setItemBook(book);
    }
  }, [book]);

  useEffect(() => {
    if (listComment) {
      setArrOfCmt(listComment);
    }
  }, [listComment]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(success, {
        position: "top-center",
      });
    }
    setIsSuccess(false);
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error(errorMessage, {
        position: "top-center",
      });
    }
    setIsError(false);
  }, [isError]);

  const updateBookHandle = () => {
    updateBook({
      slug: slugBook,
      name: name,
      author: author,
      type: type,
      publishedDate: publishedDate,
      pageCount: pageCount,
      description: description,
      imgSrc: imageUrl,
    });
  };

  const backHomePage = () => {
    router.push("/");
  };

  const showPreview = (event: any) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      setFileInputState(event.target.value);
    }
  };

  return (
    <div className={styles.bookItem}>
      <div className={styles.bookItem_container}>
        <div className={styles.bookContainer}>
          <IoArrowBackSharp
            onClick={backHomePage}
            className={styles.backicon}
          />
          <h1 className={styles.title}>{name}</h1>
          <div className={styles.container}>
            <div className={styles.wrapper}>
              <div className={styles.item}>
                <p>Tiêu đề</p>
                <input
                  disabled={ableToEdit ? false : true}
                  className={styles.inputName}
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className={styles.item}>
                <p>Tác giả </p>
                <input
                  type="text"
                  value={author}
                  disabled={ableToEdit ? false : true}
                  onChange={(e) => {
                    setAuthor(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className={styles.desc}>
              <p>Mô tả về sách</p>
              <textarea
                value={description}
                disabled={ableToEdit ? false : true}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className={styles.wrapper}>
              <div className={styles.item}>
                <p>Ngày phát hành</p>
                <input
                  type="date"
                  value={publishedDate}
                  disabled={ableToEdit ? false : true}
                  onChange={(e) => {
                    setPublishedDate(e.target.value);
                  }}
                />
              </div>
              <div className={styles.item}>
                <p>Số trang</p>
                <input
                  disabled={ableToEdit ? false : true}
                  type="text"
                  value={pageCount}
                  onChange={(e) => {
                    setPageCount(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className={styles.type}>
              <p>Thể loại</p>
              <select
                disabled={ableToEdit ? false : true}
                onChange={(e) => setType(e.target.value)}
              >
                {arrType.map((item, index) => {
                  return (
                    <option key={index} value={`${type}`}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div>
            {!hiddenEdit && (
              <button
                onClick={() => {
                  setShowAdd(true);
                  setAbleToEdit(true);
                  setHidenEdit(true);
                }}
              >
                Edit
              </button>
            )}
            {showAdd && (
              <button className={styles.saveBtn} onClick={updateBookHandle}>
                Save
              </button>
            )}
          </div>
        </div>
        <div className={styles.wrap_previewImg}>
          <div className={styles.wrap_Img}>
            <label htmlFor="file-ip-1">Upload Image</label>
            {ableToEdit && (
              <span
                className={styles.removeImg}
                onClick={() => {
                  setImageUrl("");
                  setFileInputState("");
                }}
              >
                X
              </span>
            )}
          </div>
          <div className={styles.preview}>
            <img
              id={styles.img_id_1}
              alt="image"
              src={
                imageUrl
                  ? imageUrl
                  : "https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg"
              }
            />
          </div>

          <input
            type="file"
            id="file-ip-1"
            accept="image/*"
            value={fileInputState}
            disabled={ableToEdit ? false : true}
            onChange={(e) => showPreview(e)}
          />
        </div>
      </div>
    </div>
  );
};

export default Post;
