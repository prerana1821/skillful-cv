import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/Layout/NotFound";
import { Editor } from "./components/Edit/Editor";
import { Share } from "./components/Share/Share";
import { DataProvider } from "./components/Edit/DataProvider";
import App from "./App";
import Dashboard from "./components/Portfolio/Dashboard";
import About from "./components/Portfolio/About";
import Experience from "./components/Portfolio/Experience";
import Projects from "./components/Portfolio/Projects";
import Blogs from "./components/Portfolio/Blogs";
import Education from "./components/Portfolio/Education";
import Overview from "./components/Portfolio/Overview";

import "./index.css";
// const Dashboard = lazy(() => import("./components/Portfolio/Dashboard"));

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
    path: "editor",
    element: <Editor />,
    errorElement: <ErrorPage />,
  },
  {
    path: "share/:resumeId",
    element: <Share />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/portfolio",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "overview",
        element: <Overview />,
        errorElement: <ErrorPage />,
      },
      {
        path: "about",
        element: <About />,
        errorElement: <ErrorPage />,
      },
      {
        path: "education",
        element: <Education />,
        errorElement: <ErrorPage />,
      },
      {
        path: "experience",
        element: <Experience />,
        errorElement: <ErrorPage />,
      },
      {
        path: "projects",
        element: <Projects />,
        errorElement: <ErrorPage />,
      },
      {
        path: "blogs",
        element: <Blogs />,
        errorElement: <ErrorPage />,
      },
      {
        path: "site",
        element: <Dashboard />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <DataProvider>
        <RouterProvider router={router} />
      </DataProvider>
    </ChakraProvider>
  </React.StrictMode>
);
