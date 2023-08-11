import React from 'react';
import ReactDOM from 'react-dom/client';
import Layout from "./pages/Layout/Layout";
import HeroPage from "./pages/HeroPage";
import HeroesPage from "./pages/HeroesPage";
import reportWebVitals from "./reportWebVitals";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { webRoutes } from "./constants/webRoutes";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: `/${webRoutes.heroes}`,
        element: <HeroesPage />,
      },
      {
        path: `/${webRoutes.heroes}/:id`,
        element: <HeroPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
