import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MantineProvider, createTheme } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { useAuth0 } from "@auth0/auth0-react";
import Index from "./routes/Index.tsx";
import ErrorPage from "./routes/ErrorPage.tsx";
import PrivateRoute from "./routes/PrivateRoute.tsx";
import ViewQR from "./routes/ViewQR.tsx";
import CreateQR from "./routes/CreateQR.tsx";
import Profile from "./routes/Profile.tsx";
import ViewId from "./routes/AccessQR.tsx";
import Load from "./utils/Load.tsx";

const theme = createTheme({
  colors: {
    teal: [
      "#eefffb",
      "#c6fff4",
      "#8effea",
      "#4dfbdf",
      "#19e8cd",
      "#00c7b0",
      "#00a495",
      "#028378",
      "#086760",
      "#0c5550",
      "#003433",
    ],
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/app",
    element: <PrivateRoute />,
    children: [
      { path: "/app/createqr", element: <CreateQR /> },
      { path: "/app/viewqr", element: <ViewQR /> },
      { path: "/app/profile", element: <Profile /> },
      // other protected routes go here
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: "/viewLink/:id",
    element: <ViewId />,
    errorElement: <ErrorPage />,
  },
]);

export const App = () => {
  const { isLoading } = useAuth0();

  return (
    <MantineProvider theme={theme}>
      <Notifications />
      {isLoading ? <Load /> : <RouterProvider router={router} />}
    </MantineProvider>
  );
};
