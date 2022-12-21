import { Box, Popover, Typography } from "@mui/material";
import React from "react";
// import styles from "../homeContainer/Home.module.scss";
import styles from "../containers/homeContainer/Home.module.scss";

import { FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/router";

const Header = ({ login, userData }: any) => {
  const route = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  console.log("userData:", userData);

  return (
    <div className={styles.header}>
      <h1>
        {login && (
          <>
            <Box
              component="div"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
                cursor: "pointer",
                width: "fit-content",
                marginLeft: "auto",
              }}
              aria-describedby={id}
              onClick={handleClick}
            >
              {/* Client Page <span></span> */}
              <Box
                sx={{
                  fontSize: "1.5rem",
                  paddingRight: "1.2rem",
                  "& > svg": {
                    fontSize: "2.4rem",
                  },
                }}
              >
                <FaUserCircle />
              </Box>
              <Typography
                sx={{
                  fontSize: "2rem",
                }}
              >
                {userData.username}
              </Typography>
            </Box>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Box
                sx={{
                  padding: "1rem 2rem",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1.5rem",
                    paddingBottom: "0.6rem",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    route.push("/client");
                  }}
                >
                  Trang chủ
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1.5rem",
                    paddingBottom: "0.6rem",
                    cursor: "pointer",
                  }}
                >
                  Thông tin cá nhân
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1.5rem",
                    paddingBottom: "0.6rem",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    route.push("/order/" + userData.username);
                  }}
                >
                  Đơn hàng
                </Typography>
              </Box>
            </Popover>
          </>
        )}
        {!login && <>Welcome to Library </>}
      </h1>
    </div>
  );
};

export default Header;
