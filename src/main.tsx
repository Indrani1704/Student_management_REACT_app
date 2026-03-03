import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";

// Professional Light Theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#2563eb", 
    },
    secondary: {
      main: "#1e3a8a",
    },
    background: {
      default: "#f4f6f9",
    },
  },
  typography: {
    fontFamily: "Inter, Roboto, sans-serif",
  },
  shape: {
    borderRadius: 12,
  },
});

ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
      />
    </ThemeProvider>
  </React.StrictMode>
);