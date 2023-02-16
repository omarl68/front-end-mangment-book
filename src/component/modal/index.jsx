import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Box } from "@mui/system";
import React, { useState } from "react";

import SendIcon from "@mui/icons-material/Send";
import { useDispatch } from "react-redux";
import { updatePost } from "../../feature/userSlice";
function Index({ handleClose, openM, row, iid }) {
  console.log(iid);
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
  const [name, setname] = useState(row.name);
  const [age, setAge] = useState(row.age);
  const [email, setemail] = useState(row.email);
  const [password, setpassword] = useState(null);
  const [Confirmpassword, setConfirmpassword] = useState(null);
  const [Role, setRole] = useState();

  const onnameChange = (e) => setname(e.target.value);
  const onAgeChange = (e) => setAge(e.target.value);
  const onemailChange = (e) => setemail(e.target.value);
  const onpasswordChange = (e) => setpassword(e.target.value);
  const onConfirmpasswordChange = (e) => setConfirmpassword(e.target.value);
  const onRoleChange = (e) => setRole(e.target.value);

  const canSave = [name, age, email].every(Boolean);
  const id = row._id;
  const onSavePostClicked = () => {
    if (canSave) {
      try {
        /*    if (
          name &&
          age &&
          email &&
          password === Confirmpassword
        ) { */
        if (Role === null) {
          setRole("user");
        }
        if (password === Confirmpassword && password) {
          dispatch(
            updatePost({
              id,
              name,
              age,
              email,
              password,
              Confirmpassword,
              Role,
            })
          ).unwrap();
        } else {
          dispatch(
            updatePost({
              id,
              name,
              age,
              email,
              password,
              Confirmpassword,
              Role,
            })
          ).unwrap();
        }
        setname("");
        setAge("");
        setemail("");
        setpassword("");
        setConfirmpassword("");
        setRole("user");
        handleClose()
       
        /*  } */
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
          <EditIcon sx={{ mr: 1 }} />
          Edit User
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
            id="outlined-number"
            label="Age"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{ inputProps: { min: 3 } }}
            value={age}
            onChange={onAgeChange}
          />
          <TextField
            style={{ margin: "1rem" }}
            required
            id="outlined-required"
            label="Email"
            value={email}
            onChange={onemailChange}
          />

          <TextField
            style={{ margin: "1rem" }}
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={onpasswordChange}
          />
          <FormControl sx={{ m: 2, minWidth: 270 }} size="small">
            <InputLabel id="demo-select-small">Role</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              label="Role"
              value={Role}
              onChange={onRoleChange}
            >
              <MenuItem value={10}>Admin</MenuItem>
              <MenuItem value={20}>user</MenuItem>
            </Select>
          </FormControl>
          <TextField
            style={{ margin: "1rem" }}
            id="outlined-password-input"
            label="Confirm Password"
            type="password"
            autoComplete="current-password"
            value={Confirmpassword}
            onChange={onConfirmpasswordChange}
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
