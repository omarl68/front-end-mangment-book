import { Button, Container, Stack, Typography } from "@mui/material";
import React from "react";
import Iconify from "../component/iconify";
import TableUser from "../component/tableUser";
function usersPage() {
  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4" gutterBottom>
          User
        </Typography>
        <Button
          variant="contained"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          New User
        </Button>
      </Stack>
      <TableUser />
    </Container>
  );
}

export default usersPage;
