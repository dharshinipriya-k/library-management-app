import React from "react";
import AuthorInfo from "../components/AuthorInfo";
import AuthorRecords from "../components/AuthorRecords";
import BookRecords from "../components/BookRecords";
import Dashboard from "../components/Dashboard";
import CreateBook from "../components/CreateBook";
import EditBook from "../components/EditBook";
import CreateAuthor from "../components/CreateAuthor";
import EditAuthor from "../components/EditAuthor";

import { Navigate } from "react-router-dom";

export const AppRoutes = [
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/books",
    element: <BookRecords />,
  },
  {
    path: "/author",
    element: <AuthorRecords />,
  },
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/create-book",
    element: <CreateBook />,
  },
  {
    path: "/edit-book/:id",
    element: <EditBook />,
  },
  {
    path: "/create-author",
    element: <CreateAuthor />,
  },
  {
    path: "/edit-author/:id",
    element: <EditAuthor />,
  },
  {
    path: "/authorinfo/:id",
    element: <AuthorInfo />,
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
];
