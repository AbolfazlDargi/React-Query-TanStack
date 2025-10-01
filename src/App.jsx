import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home } from "./components/Pages/Home";
import { FetchOld } from "./components/Pages/FetchOld";
import { FetchRQ } from "./components/Pages/FetchRQ";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./App.css";
import { FetchIndv } from "./components/UI/FetchIndv";
import {InfiniteScroll} from "./components/Pages/InfiniteScroll"

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/trad",
        element: <FetchOld />,
      },
      {
        path: "/rq",
        element: <FetchRQ />,
      },
      {
        path: "/rq/:id",
        element: <FetchIndv />,
      },
      {
        path: "/infinite",
        element: <InfiniteScroll/>
      }
    ],
  },
]);

const app = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <>
        <RouterProvider router={router}></RouterProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </>
    </QueryClientProvider>
  );
};

export default app;
