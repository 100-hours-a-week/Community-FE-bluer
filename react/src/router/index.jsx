import { createBrowserRouter } from "react-router-dom";

import { routePatterns } from "@/hooks/route/useRouteName";
import AppLayout from "@/layouts/AppLayout";
import RootLayout from "@/layouts/RootLayout";
import ProtectedRoute from "@/router/ProtectedRoute";
import GuestOnlyRoute from "./GuestOnlyRoute";

const routes = routePatterns.map(({ pattern, page, protected: isProtected, guestOnly }) => {
  let element = page;

  if (isProtected) {
    element = <ProtectedRoute>{element}</ProtectedRoute>;
  }
  if (guestOnly) {
    element = <GuestOnlyRoute>{element}</GuestOnlyRoute>;
  }

  return { path: pattern, element };
});

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
