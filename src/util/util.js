import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "";

export const sortData = (data) => {
  const sortedData = [...data];

  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

const casesTypeColors = {
  cases: {
    option: { color: "#cc1034", fillColor: "#cc1034" },
    multiplier: 100,
  },
  recovered: {
    option: { color: "#7dd71d", fillColor: "#7dd71d" },
    multiplier: 100,
  },
  deaths: {
    option: { color: "#ff6c47", fillColor: "#ff6c47" },
    multiplier: 100,
  },
};

export const showDataOnMap = (data, casesType) =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      pathOptions={casesTypeColors[casesType].option}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div className="info_container">
          <div
            className="info_flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <div className="info_name">{country.country}</div>
          <div className="info_confirmed">
            Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className="info_recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info_deaths">
            Deaths: {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));
