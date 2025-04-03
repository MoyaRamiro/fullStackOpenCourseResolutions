import axios from "axios";
import { useEffect, useState } from "react";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

export const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  async function fetchCountry() {
    const response = await axios.get(
      `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`
    );
    console.log(response.data);
    setCountry(response);
  }

  useEffect(() => {
    if (!name) return;

    fetchCountry();
  }, [name]);

  return country;
};
