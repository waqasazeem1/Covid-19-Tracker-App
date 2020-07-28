import React, { useState, useEffect } from "react";
import {
  MenuItem,
  Select,
  FormControl,
  CardContent,
  Card,
} from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";
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

  const selectCountry = (event) => {
    const countryCode = event.target.value;
    console.log(countryCode);
    setCountry(countryCode);
  };

  return (
    <div className="app">
      <div className="app_left">
        <div className="app_header">
          <h1>Covid-19 App</h1>
          <FormControl className="app_dropdown">
            <Select variant="outlined" onChange={selectCountry} value={country}>
              <MenuItem value="worldwide">worldwide</MenuItem>

              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app_status">
          <InfoBox title="cronavirus cases" cases={123} total={2000} />
          <InfoBox title="Recovered" cases={123} total={2000} />
          <InfoBox title="Deaths" cases={123} total={2000} />
        </div>
        <div>
          <Map />
        </div>
      </div>

      <Card className="app_right">
        <CardContent>
          <h3>Live cases by country</h3>
          <h3>Worldwide new cases</h3>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
