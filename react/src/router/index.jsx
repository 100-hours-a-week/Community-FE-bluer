// src/router/index.jsx
import { createBrowserRouter } from "react-router-dom";

import AppLayout from "@/layouts/AppLayout";
import RootLayout from "@/layouts/RootLayout";

import PostList from "@/pages/PostList";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <AppLayout />,
        children: [{ path: "/", element: <PostList /> }],
      },
    ],
  },
]);
