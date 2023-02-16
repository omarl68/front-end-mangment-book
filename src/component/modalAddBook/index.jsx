import {
  Button,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { Box } from "@mui/system";
import React, { useState } from "react";

import SendIcon from "@mui/icons-material/Send";
import { useDispatch } from "react-redux";
import { addNewPost } from "../../feature/postsSlice";
function Index({ handleClose, openM, title }) {
 
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "white",
    border: "0px solid #000",
    borderRadius: "1rem",
    boxShadow: 24,
    m: 1,
    p: 4,
    "& .MuiTextField-root": { m: 1, width: "30ch" },
  };
  const styleForm = {
    display: "flex",
    alignItems: "center",
    // justifyContent: "center",
    flexWrap: "wrap",
    // flexDirection: "column",
  };
  // const Status = useSelector(getPostsStatus);
  const dispatch = useDispatch();
  const [name, setname] = useState();
  const [author, setauthor] = useState();
  const [page, setpage] = useState();
  const [price, setprice] = useState();

  const onnameChange = (e) => setname(e.target.value);
  const onauthorChange = (e) => setauthor(e.target.value);
  const onpageChange = (e) => setpage(e.target.value);
  const onpriceChange = (e) => setprice(e.target.value);

  const canSave = [name, author, page, price].every(Boolean);

  const onSavePostClicked = () => {
    if (canSave) {
      try {
        if (name && author && page && price) {
          dispatch(
            addNewPost({
              name,
              author,
              page,
              price,
            })
          ).unwrap();
          setname("");
          setauthor("");
          setpage("");
          setprice("");

          handleClose();
        }
      } catch (err) {
        console.log("fail");
      }
    }
  };
  return (
    <Modal
      open={openM}
      onClose={handleClose}
      aria-labelledby="modal-modal-name"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} component="form" noValidate autoComplete="off">
        <Typography
          id="modal-modal-name"
          variant="h6"
          component="h2"
          sx={{ mb: 3, display: "flex", alignItems: "center", ml: 2 }}
        >
          <PersonAddAlt1Icon sx={{ mr: 1 }} />
          Edit Book
        </Typography>
        <div style={styleForm}>
          <TextField
            style={{ margin: "1rem" }}
            required
            id="outlined-required"
            label="Name"
            value={name}
            onChange={onnameChange}
          />
          <TextField
            style={{ margin: "1rem" }}
            required
            id="outlined-required"
            label="author"
            value={author}
            onChange={onauthorChange}
          />
          <TextField
            style={{ margin: "1rem" }}
            required
            id="outlined-required"
            label="page"
            value={page}
            onChange={onpageChange}
          />

          <TextField
            style={{ margin: "1rem" }}
            id="outlined-price-input"
            required
            label="price"
            type="price"
            autoComplete="current-price"
            value={price}
            onChange={onpriceChange}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            marginRight: " 3rem",
          }}
        >
          <Button
            sx={{ mt: 3 }}
            variant="contained"
            endIcon={<SendIcon />}
            disabled={!canSave}
            onClick={onSavePostClicked}
          >
            Send
          </Button>
        </div>
      </Box>
    </Modal>
  );
}

export default Index;
