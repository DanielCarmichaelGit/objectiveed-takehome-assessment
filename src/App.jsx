import React from "react";
import "./App.css";

import Dashboard from "./Features/Dashboard/Dashboard";

// Provider Imports
import { ThemeProvider } from "@mui/material/styles"; // Import ThemeProvider
import { Provider } from 'react-redux';

// Provider Utility Imports
import theme from "./Styles/Theme/theme"; // Import your custom theme
import store from "./StateManagement/Store/store";


function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        {" "}
        {/* Wrap your components with ThemeProvider */}
        <Dashboard />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
