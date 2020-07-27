import React from "react";
import { MenuItem, Select, FormControl } from "@material-ui/core";
import "./App.css";

function App() {
  return (
    <div className="app">
      <div className="app_header">
        <h1>Covid-19 App</h1>
        <FormControl className="app_dropdown">
          <Select variant="outlined" value="abc">
            <MenuItem value="worldwide">worldwide</MenuItem>
            <MenuItem value="worldwide">worldwide</MenuItem>
            <MenuItem value="worldwide">worldwide</MenuItem>
            <MenuItem value="worldwide">worldwide</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default App;
