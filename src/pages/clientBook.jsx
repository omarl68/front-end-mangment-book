import React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import BookmarkAdd from "@mui/icons-material/BookmarkAddOutlined";

import { useSelector } from "react-redux";
import { selectAllPosts } from "../feature/postsSlice";
import { Container } from "@mui/system";
import { CssVarsProvider } from "@mui/joy/styles";
import { Stack } from "@mui/material";
const ClientBook = () => {
  const posts = useSelector(selectAllPosts);
  return (
    <CssVarsProvider>
      <Container
        sx={{ display: "flex", flexDirection: "column", ml: 10, mt: 5 }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h2" gutterBottom>
            List Books
          </Typography>
        </Stack>
        <Box sx={{ display: "flex" }}>
          {posts.map((row, index) => (
            <Card variant="outlined" sx={{ width: 320, m: 2 }}>
              <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
                {row.name}
              </Typography>
              <Typography level="body2">Number of page : {row.page}</Typography>
              <IconButton
                aria-label="bookmark Bahamas Islands"
                variant="plain"
                color="neutral"
                size="sm"
                sx={{ position: "absolute", top: "0.5rem", right: "0.5rem" }}
              >
                <BookmarkAdd />
              </IconButton>
              <AspectRatio minHeight="120px" maxHeight="200px" sx={{ my: 2 }}>
                <img
                  src="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286"
                  srcSet="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286&dpr=2 2x"
                  loading="lazy"
                  alt=""
                />
              </AspectRatio>
              <Box sx={{ display: "flex" }}>
                <div>
                  <Typography level="body3">Total price:</Typography>
                  <Typography fontSize="lg" fontWeight="lg">
                    {row.price}
                  </Typography>
                </div>
                <Button
                  variant="solid"
                  size="sm"
                  color="primary"
                  aria-label="Explore Bahamas Islands"
                  sx={{ ml: "auto", fontWeight: 600 }}
                >
                  Explore
                </Button>
              </Box>
            </Card>
          ))}
        </Box>
      </Container>
    </CssVarsProvider>
  );
};

export default ClientBook;
