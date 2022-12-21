import styles from "./addBook.module.scss";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useStore } from "../../store";
import { IoArrowBackSharp } from "react-icons/io5";
import { useRouter } from "next/router";

const AddBookContainer = () => {
  const router = useRouter();

  const {
    addBook,
    isSuccess,
    success,
    setIsSuccess,
    isError,
    errorMessage,
    setIsError,
  } = useStore();
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDiscription] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [type, setType] = useState("Trinh thám ");
  const [selectedFile, setSelectedFile] = useState("");
  const [fileInputState, setFileInputState] = useState("");
  let arrType = [
    "Trinh thám",
    "Tiểu thuyết",
    "Phưu lưu",
    "Ma thuật",
    "Truyện tranh",
    "Thám hiểm",
    "Giải trí",
    "Self-help",
  ];

  const saveBook = () => {
    if (
      name == "" ||
      author == "" ||
      description == "" ||
      publishedDate == "" ||
      imgSrc == ""
    ) {
      toast.warn("Please fill all the field", {
        position: "top-center",
      });
    } else if (pageCount <= 0) {
      toast.warn("Page count must be greater than 0", {
        position: "top-center",
      });
    } else {
      const data = {
        name: name,
        author: author,
        description: description,
        publishedDate: publishedDate,
        pageCount: pageCount,
        imgSrc: imgSrc,
        type: type,
      };
      addBook({
        newBook: data,
      });
    }
  };

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

  const backHomePage = () => {
    router.push("/");
  };
  const showPreview = (event: any) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImgSrc(reader.result as string);
      };
      setSelectedFile(file);
      setFileInputState(event.target.value);
    }
  };

  return (
    <div className={styles.bookContainer}>
      <IoArrowBackSharp onClick={backHomePage} className={styles.backicon} />
      <h1 className={styles.title}>Add book to the library</h1>
      <div className={styles.container}>
        <div className={styles.form_input}>
          <div className={styles.wrapper}>
            <div className={styles.item}>
              <p>Tiêu đề</p>
              <input
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
              onChange={(e) => {
                setDiscription(e.target.value);
              }}
            />
          </div>
          <div className={styles.wrapper}>
            <div className={styles.item}>
              <p>Ngày phát hành</p>
              <input
                type="date"
                value={publishedDate}
                onChange={(e) => {
                  setPublishedDate(e.target.value);
                }}
              />
            </div>
            <div className={styles.item}>
              <p>Số trang</p>
              <input
                type="number"
                value={pageCount}
                onChange={(e) => {
                  setPageCount(+e.target.value);
                }}
              />
            </div>
          </div>
          <div className={styles.type}>
            <p>Thể loại</p>
            <select onChange={(e) => setType(e.target.value)}>
              {arrType.map((item, index) => {
                return (
                  <option key={index} value={`${item}`}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className={styles.wrap_previewImg}>
          <div className={styles.wrap_Img}>
            <label htmlFor="file-ip-1">Upload Image</label>
            <span
              className={styles.removeImg}
              onClick={() => {
                setImgSrc("");
                setFileInputState("");
              }}
            >
              X
            </span>
          </div>
          <div className={styles.preview}>
            <img
              id={styles.img_id_1}
              alt="image"
              src={
                imgSrc
                  ? imgSrc
                  : "https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg"
              }
            />
          </div>

          <input
            type="file"
            id="file-ip-1"
            accept="image/*"
            value={fileInputState}
            onChange={(e) => showPreview(e)}
          />
        </div>
      </div>
      <button onClick={saveBook} className={styles.saveBtn}>
        Save
      </button>
    </div>
  );
};

export default AddBookContainer;
