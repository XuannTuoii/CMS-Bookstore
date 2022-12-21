import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { IoMdTrash } from "react-icons/io";
import { ConfirmDialog } from "primereact/confirmdialog"; // To use <ConfirmDialog> tag
import { confirmDialog } from "primereact/confirmdialog";
import { useStore } from "../store";

const OrderItem = ({ item }: any) => {
  const [visible, setVisible] = useState(false);
  const { deleteOrder, getAllOrder } = useStore();

  const accept = () => {
    deleteOrder({
      id: item._id,
    });
    getAllOrder({
      username: item.userName,
    });
  };

  const cancelOrder = () => {
    setVisible(true);
  };

  const convertDateToString = (date: any) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: "2rem",
        paddingTop: "2rem",
        borderBottom: "1px solid #ccc",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          src={item.bookImg}
          sx={{
            width: "10rem",
            height: "10rem",
            objectFit: "cover",
            borderRadius: "0.4rem",
          }}
        />
        <Typography
          sx={{
            fontSize: "2.2rem",
            fontWeight: "600",
            marginLeft: "2.6rem",
            color: "#000",
          }}
        >
          {item.bookName}
        </Typography>
        <Typography
          sx={{
            fontSize: "1.6rem",
            fontWeight: "400",
            marginLeft: "3rem",
            color: "#000",
          }}
        >
          {item.email}
        </Typography>
        <Typography
          sx={{
            fontSize: "1.6rem",
            fontWeight: "400",
            marginLeft: "4rem",
            color: "#000",
          }}
        >
          {item.number}
        </Typography>
        <Typography
          sx={{
            fontSize: "1.6rem",
            fontWeight: "400",
            marginLeft: "4rem",
            color: "#000",
          }}
        >
          {convertDateToString(new Date(item.dateCreateOrder))}
        </Typography>
      </Box>
      <Button onClick={cancelOrder}>
        <Typography
          sx={{
            fontSize: "1.6rem",
            marginRight: "1rem",
          }}
        >
          Hủy đơn
        </Typography>
        <Box
          sx={{
            "& > svg": {
              fontSize: "2.4rem",
            },
          }}
        >
          <IoMdTrash />
        </Box>
      </Button>
      <ConfirmDialog
        visible={visible}
        onHide={() => setVisible(false)}
        message="Bạn có chắc chắn muốn hủy đơn hàng? "
        header="Confirmation"
        icon="pi pi-exclamation-triangle"
        accept={accept}
        style={{ fontSize: "1.6rem" }}
      />
    </Box>
  );
};

export default OrderItem;
