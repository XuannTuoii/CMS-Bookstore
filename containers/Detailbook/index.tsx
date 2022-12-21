import {
  Avatar,
  Box,
  Button,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { useStore } from "../../store";

import { ConfirmDialog } from "primereact/confirmdialog"; // To use <ConfirmDialog> tag
import { confirmDialog } from "primereact/confirmdialog"; // To use confirmDialog method

const DetailBook = ({ book, listComment }: any) => {
  const [number, setNumber] = React.useState(1); // number of book
  const [value, setValue] = React.useState(0); //star
  const [cmtContent, setCmtContent] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  const { user, makeAnOrder, addCommnet, getAllComment } = useStore();
  console.log("book:", book);

  const accept = () => {
    makeAnOrder({
      number: number,
      bookSlug: book.slug,
      userName: user.username,
      email: user.email,
      bookName: book.name,
      bookImg: book.img_url,
    });
  };

  const addAComment = () => {
    if (cmtContent.trim() === "") {
      alert("Please enter your comment!");
      return;
    }
    addCommnet({
      rating: value,
      belongTo: user?.username,
      content: cmtContent,
      cmtForBook: book.slug,
    });
    getAllComment({
      slug: book.slug,
    });
    setCmtContent("");
  };

  return (
    <Box
      sx={{
        margin: "4rem auto",
        maxWidth: "128rem",
      }}
    >
      <Box
        sx={{
          marginTop: "4rem",
          boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
          padding: "3rem 3rem",
          display: "flex",
          alignItems: "flex-start",
        }}
      >
        <Box
          component="img"
          src={
            book.img_url ||
            "https://matviet.vn/wp-content/themes/monatheme/public/images/default-thumbnail.jpg"
          }
          sx={{
            width: "40rem",
            height: "40rem",
            objectFit: "cover",
            borderRadius: "1rem",
            boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
            marginRight: "10rem",
          }}
        />
        <Box>
          <Typography
            sx={{
              fontSize: "3rem",
              paddingBottom: "0.2rem",
              fontWeight: "bold",
              marginTop: "5rem",
            }}
          >
            {book.name}
          </Typography>
          <Typography
            sx={{
              fontSize: "1.5rem",
              paddingBottom: "0.6rem",
              fontWeight: "400",
              color: "#ccc",
            }}
          >
            by {book.author}
          </Typography>
          <Typography
            sx={{
              fontSize: "1.5rem",
              paddingBottom: "0.6rem",
              fontWeight: "500",
              color: "#fe2f3f",
            }}
          >
            {book.type}
          </Typography>
          <Typography
            sx={{
              fontSize: "1.5rem",
              paddingTop: "1.2rem",
              paddingBottom: "0.6rem",
              fontWeight: "300",
              lineHeight: "2.5rem",
              color: "#ccc",
            }}
          >
            {book.description}
          </Typography>
          <Rating
            name="simple-controlled"
            value={value}
            onChange={(event: any, newValue: any) => {
              setValue(newValue);
            }}
            sx={{
              fontSize: "2rem",
              marginTop: "1.2rem",
            }}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "4rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Button
                sx={{
                  fontSize: "2rem",
                  padding: "1rem 2rem",
                }}
                onClick={() => {
                  if (number > 1) {
                    setNumber(number - 1);
                  }
                }}
              >
                <AiOutlineMinusCircle />
              </Button>
              <Typography
                sx={{
                  margin: "0 1rem",
                  fontSize: "1.5rem",
                }}
              >
                {number}
              </Typography>
              <Button
                sx={{
                  fontSize: "2rem",
                  padding: "1rem 2rem",
                }}
                onClick={() => setNumber(number + 1)}
              >
                <AiOutlinePlusCircle />
              </Button>
            </Box>
            <Button
              sx={{
                fontSize: "1.5rem",
                padding: "1rem 2rem",
              }}
              onClick={() => setVisible(true)}
            >
              Mua
            </Button>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          marginTop: "4rem",
        }}
      >
        <Typography
          sx={{
            fontSize: "2.4rem",
          }}
        >
          Bình luận
        </Typography>
        {/* List comment */}
        <Box
          sx={{
            padding: "2rem 0",
          }}
        >
          {listComment.map((cmt: any, index: any) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "2rem",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "20rem",
                }}
              >
                <Avatar
                  src="https://thumbs.dreamstime.com/b/vecteur-d-ic%C3%B4ne-de-profil-avatar-par-d%C3%A9faut-image-sociale-utilisateur-m%C3%A9dias-social-182145777.jpg"
                  sx={{
                    marginRight: "2rem",
                  }}
                />
                <Typography
                  sx={{
                    fontSize: "1.6rem",
                    fontWeight: "bold",
                  }}
                >
                  {cmt.belongTo}
                </Typography>
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: "1.4rem",
                  }}
                >
                  {cmt.content}
                </Typography>
                {cmt.rating > 0 && (
                  <Box>
                    <Rating name="read-only" value={cmt.rating} readOnly />
                  </Box>
                )}
              </Box>
            </Box>
          ))}

          {/* Input comment  */}
          <Box
            sx={{
              width: "100%",
              paddingTop: "1.6rem",
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <TextField
              value={cmtContent}
              sx={{
                width: "90%",
                "& > label": {
                  paddingBottom: "1rem",
                  fontSize: "1.6rem",
                },
                "& > div": {
                  marginTop: "30px !important",
                  "& > input": {
                    fontSize: "1.4rem",
                    paddingLeft: "1.2rem",
                  },
                },
              }}
              id="standard-basic"
              label="Comment"
              variant="standard"
              onChange={(e) => setCmtContent(e.target.value)}
            />
            <Button
              sx={{
                fontSize: "1.4rem",
                marginLeft: "1.6rem",
              }}
              onClick={addAComment}
            >
              Gửi
            </Button>
          </Box>
        </Box>
      </Box>
      <ConfirmDialog
        visible={visible}
        onHide={() => setVisible(false)}
        message="Bạn có chắc muốn mua cuốn sách này?"
        header="Confirmation"
        icon="pi pi-exclamation-triangle"
        accept={accept}
        style={{ fontSize: "1.6rem" }}
      />
    </Box>
  );
};

export default DetailBook;
