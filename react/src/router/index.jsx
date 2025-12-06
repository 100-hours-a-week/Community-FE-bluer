import { createBrowserRouter } from "react-router-dom";

import { routePatterns } from "@/hooks/useRouteName";
import AppLayout from "@/layouts/AppLayout";
import RootLayout from "@/layouts/RootLayout";
import ProtectedRoute from "@/router/ProtectedRoute";

const routes = routePatterns.map(({ pattern, page, protected: isProtected }) => ({
  path: pattern,
  element: isProtected ? <ProtectedRoute>{page}</ProtectedRoute> : page,
}));

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <AppLayout />,
        children: routes,
      },
    ],
  },
]);
