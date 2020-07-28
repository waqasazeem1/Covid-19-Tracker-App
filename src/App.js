import React, { useState, useEffect } from "react";
import { MenuItem, Select, FormControl } from "@material-ui/core";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((res) => res.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          // set in state
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  return (
    <div className="app">
      <div className="app_header">
        <h1>Covid-19 App</h1>
        <FormControl className="app_dropdown">
          <Select variant="outlined" value={country}>
            <MenuItem value="worldwide">worldwide</MenuItem>

            {countries.map((country) => (
              <div key={country.name}>
                <MenuItem value={country.value}>{country.name}</MenuItem>
              </div>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default App;
