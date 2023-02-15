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
import { Box } from "@mui/system";
import React from "react";
import Iconify from "../iconify";
import SendIcon from "@mui/icons-material/Send";
function Index({ handleClose, openM, row }) {
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

  return (
    <Modal
      open={openM}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} component="form" noValidate autoComplete="off">
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ mb: 3 }}
        >
          <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
          Update User
        </Typography>
        <div style={styleForm}>
          <TextField
            style={{ margin: "1rem" }}
            required
            id="outlined-required"
            label="Name"
            defaultValue={row.name}
          />
          <TextField
            required
            style={{ margin: "1rem" }}
            id="outlined-number"
            label="Age"
            type="number"
            defaultValue={row.age}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            style={{ margin: "1rem" }}
            required
            id="outlined-required"
            label="Email"
            defaultValue={row.email}
          />

          <TextField
            required
            style={{ margin: "1rem" }}
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
          />
          <FormControl sx={{ m: 2, minWidth: 570 }} size="small">
            <InputLabel id="demo-select-small">Role</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={row.Role}
              label="Role"
              renderValue={(selected) => {
                if (row.role) {
                  return <em>{row.role}</em>;
                }
              }}
              /* onChange={handleChange} */
            >
              <MenuItem value={10}>Admin</MenuItem>
              <MenuItem value={20}>user</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            marginRight: " 3rem",
          }}
        >
          <Button variant="contained" endIcon={<SendIcon />}>
            Send
          </Button>
        </div>
      </Box>
    </Modal>
  );
}

export default Index;
