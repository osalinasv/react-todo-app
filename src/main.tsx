import { Root } from "@/routes/root";
import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

const WithContextRoute = lazy(() => import("@/routes/with-context"));
const WithZustandRoute = lazy(() => import("@/routes/with-zustand"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <WithContextRoute />,
      },
      {
        path: "zustand",
        element: <WithZustandRoute />,
      },
    ],
  },
]);

// biome-ignore lint/style/noNonNullAssertion: Assume root will exist
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
