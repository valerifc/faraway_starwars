import React from "react";
import Layout from "./pages/Layout/Layout";
import HeroPage from "./pages/HeroPage";
import HeroesPage from "./pages/HeroesPage";
import { webRoutes } from "./constants/webRoutes";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={`/${webRoutes.heroes}?page=1`} replace />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: `/${webRoutes.heroes}`,
        element: <HeroesPage />,
      },
      {
        path: `/${webRoutes.hero}/:heroId`,
        element: <HeroPage />,
      },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
