import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { fetchUsers } from "./feature/userSlice.jsx";
import { fetchPosts } from "./feature/postsSlice";

// ----------------------------------------------------------------------
store.dispatch(fetchUsers());
store.dispatch(fetchPosts());
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);


