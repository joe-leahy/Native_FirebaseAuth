import React, { useState } from "react";
import { GEO_API_URL, geoApiOptions } from "../api";
import { StyleSheet, Text, Viewt } from "react-native";

const Search = ({ onSearchChange }) => {

  const [search, setSearch] = useState(null);

  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=100000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.region}, ${city.countryCode}`,
            };
          }),
        };
      })
      .catch((err) => console.error(err));
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <SearchBar
      platform="ios"
      placeholder="Search for City"
      value={search}
      onChangeText={handleOnChange}
      loadingProps={loadOptions}
    />
  );
};

export default Search;
