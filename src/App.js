import React from "react";
import MedicineTracker from "./components/MedicineTracker";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
const theme = createTheme({
  palette: {
    background: {
      default: "#F0EEED",
    },
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MedicineTracker />
      </ThemeProvider>
    </div>
  );
}

export default App;
