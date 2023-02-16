import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Modal from "../modal";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, selectAllUsers } from "../../feature/userSlice";
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
  const users = useSelector(selectAllUsers);
  const dispatch = useDispatch();
  const [activeRow, setRow] = useState(null);
  const onDeletePostClicked = (id) => {
    try {
      dispatch(deletePost({ id: id })).unwrap();
    } catch (err) {
      console.error("Failed to delete the post", err);
    }
  };

  const [id, setId] = useState();
  const [openM, setOpenM] = useState(false);
  const handleOpen = () => setOpenM(true);
  const handleClose = () => setOpenM(false);

  const [open, setOpen] = useState(null);
  const handleOpenMenu = (event, id, row) => {
    setOpen(event.currentTarget);
    setId(id);
    setRow(row);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

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
                  onClick={(el) => handleOpenMenu(el, row._id, row)}
                >
                  <Iconify icon={"eva:more-vertical-fill"} />
                </IconButton>
              </TableCell>
              {openM && (
                <Modal
                  handleClose={handleClose}
                  row={activeRow}
                  iid={id}
                  openM={openM}
                />
              )}
            </TableRow>
          ))}
          <Popover
            open={Boolean(open)}
            anchorEl={open}
            onClick={handleCloseMenu}
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

            <MenuItem
              sx={{ color: "error.main" }}
              onClick={() => onDeletePostClicked(id)}
            >
              <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
              Delete
            </MenuItem>
          </Popover>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
