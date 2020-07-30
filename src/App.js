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
import CountryTable from "./CountryTable";
import { sortData } from "./utils";
import LineGraph from "./LineGraph";
import "./App.css";
import "leaflet/dist/leaflet.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide"); // set the country in state
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((res) => res.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));

          const sortedData = sortData(data);
          setTableData(sortedData);
          setMapCountries(data);
          // set countries in state
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all") // fetch worldwide data
      .then((res) => res.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  const onChangeCountry = async (e) => {
    const countryCode = e.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // All of the data ...
        // From the country response
        setCountry(countryCode);
        setCountryInfo(data);

        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
  };

  // console.log(countryInfo);

  return (
    <div className="app">
      <div className="app_left">
        <div className="app_header">
          <h1>Covid-19 App</h1>
          <FormControl className="app_dropdown">
            <Select
              variant="outlined"
              onChange={onChangeCountry}
              value={country}
            >
              <MenuItem value="worldwide">worldwide</MenuItem>

              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app_status">
          <InfoBox
            title="cronavirus cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <InfoBox
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <InfoBox
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>
        <div>
          <Map countries={mapCountries} center={mapCenter} zoom={mapZoom} />
        </div>
      </div>

      <Card className="app_right">
        <CardContent>
          <h3>Live cases by country</h3>
          <CountryTable countries={tableData} />
          <h3>Worldwide new cases</h3>
          <LineGraph />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
