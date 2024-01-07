import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { MantineProvider, createTheme } from "@mantine/core";

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

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <App />
    </MantineProvider>
  </React.StrictMode>
);
