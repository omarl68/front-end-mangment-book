import { Button, Container, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import Iconify from "../component/iconify";
import TableBook from "../component/tableBook";

import Modal from "../component/modalAddBook";
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
          Book
        </Typography>
        <Button
          variant="contained"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleOpen}
        >
          New {title}
        </Button>
        {openM && <Modal handleClose={handleClose} openM={openM} title="Book" />}
      </Stack>
      <TableBook />
    </Container>
  );
}

export default UsersPage;
