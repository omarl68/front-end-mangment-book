import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Modal from "../modal";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../../feature/userSlice";
import {
  IconButton,
  Popover,
  MenuItem,
  Typography,
  Avatar,
  Stack,
} from "@mui/material";
import Iconify from "../iconify";

export default function BasicTable() {
  const [openM, setOpenM] = useState(false);
  const handleOpen = () => setOpenM(true);
  const handleClose = () => setOpenM(false);

  const [open, setOpen] = useState(null);
  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };
  const users = useSelector(selectAllUsers);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="right">Age</TableCell>
            <TableCell align="right">Role </TableCell>
            <TableCell align="right">Option</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row, index) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" padding="1py">
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar
                    alt={row.name}
                    src={`/assets/images/avatars/avatar_${index + 1}.jpg`}
                  />
                  <Typography variant="subtitle2" noWrap>
                    {row.name}
                  </Typography>
                </Stack>
              </TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="right">{row.age}</TableCell>
              <TableCell align="right">{row.role}</TableCell>
              <TableCell align="right">
                <IconButton
                  size="large"
                  color="inherit"
                  onClick={handleOpenMenu}
                >
                  <Iconify icon={"eva:more-vertical-fill"} />
                </IconButton>
              </TableCell>
              {openM && <Modal handleClose={handleClose} row={row} openM={openM} />}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem onClick={handleOpen}>
          <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: "error.main" }}>
          <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </TableContainer>
  );
}
