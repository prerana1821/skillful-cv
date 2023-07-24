import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/Layout/NotFound";
import { Editor } from "./components/Edit/Editor";
import { Share } from "./components/Share/Share";
import { DataProvider } from "./components/Edit/DataProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/editor",
    element: <Editor />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/share/:resumeId",
    element: <Share />,
  },
]);

root.render(
  // <React.StrictMode>
  <ChakraProvider>
    <DataProvider>
      <RouterProvider router={router} />
    </DataProvider>
  </ChakraProvider>
  // </React.StrictMode>
);
