import { Box } from "@mui/system";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./layout/Sidebar";
import UsersPage from "./pages/usersPage";
import BookPage from "./pages/bookPage";
import Login from "./pages/Login";
import ClientPage from "./pages/clientBook";
import { styled } from "@mui/material/styles";

/* import { ModalsProvider } from "./component/ModalsProvider"; */
/* import { AuthProvider } from "./contexts/JWTAuthContext";
import routes, { renderRoutes } from "./routes"; */
function App() {
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));
  return (
    /*     <AuthProvider> */
    <div className="App">
 {/*      <Routes>
        <Route path="/login" exact element={<Login />} />
      </Routes> */}
  <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
        <DrawerHeader />
        <Routes>
          <Route path="/" exact element={<UsersPage title="User" />} />
          <Route path="/book" exact element={<BookPage title="Book" />} />
          <Route path="/bookclient" exact element={<ClientPage />} />
          <Route path="/login" exact element={<Login />} />
        </Routes> 
      </Box>
    </div>
    /*     </AuthProvider> */
  );
}

export default App;
