import { Button, Container, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import Iconify from "../component/iconify";
import TableUser from "../component/tableUser";
import Modal from "../component/modalAddUser";
function UsersPage({title}) {
  const [openM, setOpenM] = useState(false);
  const handleOpen = () => setOpenM(true);
  const handleClose = () => setOpenM(false);
  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
        <Button
          variant="contained"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleOpen}
        >
          New {title}
        </Button>
        {openM && <Modal handleClose={handleClose} openM={openM} title ="User" />}
      </Stack>
      <TableUser />
    </Container>
  );
}

export default UsersPage;
