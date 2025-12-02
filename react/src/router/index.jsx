import { createBrowserRouter } from "react-router-dom";

import { routePatterns } from "@/hooks/useRouteName";
import AppLayout from "@/layouts/AppLayout";
import RootLayout from "@/layouts/RootLayout";

const routes = routePatterns.map(({ pattern, page }) => ({
  path: pattern,
  element: page,
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
