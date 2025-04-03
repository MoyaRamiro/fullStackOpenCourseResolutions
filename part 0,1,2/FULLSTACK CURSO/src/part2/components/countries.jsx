import { useEffect, useState } from "react";
import services from "../../services";
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [selectedCountry,  setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    console.log("effect");
    services
      .getAll(`${baseUrl}/api/all`)
      .then((returnedCountries) => {
        setCountries(returnedCountries.data);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  }, []);

  useEffect(() => {
    const filterCountries = countries.filter((country) =>
      country.name.common.toLowerCase().includes(filter.toLowerCase())
    );

    if (
      filterCountries.length > 10 ||
      !filterCountries.some((country) => country == selectedCountry)
    ) {
      setSelectedCountry(null);
    }

    if (filterCountries.length == 1) {
      setSelectedCountry(filterCountries[0]);
    }

    setFilteredCountries(filterCountries);
  }, [countries, filter, selectedCountry]);

  useEffect(() => {
    if (selectedCountry != null) {
      getWeather(selectedCountry);
    }
  }, [selectedCountry]);

  const getWeather = (country) => {
    services
      .getAll(
        `https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&units=metric&appid=${import.meta.env.VITE_SOME_KEY}`
      )
      .then((returnedWeather) => {
        setWeather(returnedWeather.data);
        console.log(returnedWeather.data);
      })
      .catch((error) => {
        console.log(":( ", error);
      });
  };

  const handleFilterInputChange = (event) => {
    setFilter(event.target.value);

    console.log("aaaaa", filteredCountries);
  };

  const addSelectedCountry = (country) => {
    setSelectedCountry(country);
  };

  return (
    <>
      <FilterCountries value={filter} onChange={handleFilterInputChange} />

      {countries.length == 0 ? (
        <>loading......</>
      ) : (
        <Countries
          filteredCountries={filteredCountries}
          handleButtonPressed={addSelectedCountry}
        />
      )}

      {selectedCountry && (
        <Country country={selectedCountry} weather={weather} />
      )}
    </>
  );
};

const Countries = ({ filteredCountries, handleButtonPressed }) => {
  if (filteredCountries.length > 10) {
    return (
      <>Too many matches, specify another filter</> ////////
    );
  }

  if (filteredCountries.length <= 10 && filteredCountries.length > 1) {
    return filteredCountries.map((country) => (
      <div key={country.cca3}>
        {country.name.common}
        <button type="button" onClick={() => handleButtonPressed(country)}>
          show
        </button>
      </div>
    ));
  }

  if (filteredCountries.length == 0) {
    return <>NO MATCHES</>;
  }
};

const Country = ({ country, weather }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      capital {country.capital[0]} <br />
      area {country.area} <br />
      <br />
      <br />
      <b>languages:</b> <br />
      <ul>
        {Object.values(country.languages).map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt}></img>
      {weather && 
      <div>
        <h2>Weather in {weather.name}</h2>
        <h5>temperature {weather.main.temp} Celcius</h5>
        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} style={{ backgroundColor: 'black', height: '5vh', display: 'flex'}}></img>
        <p>wind {weather.wind.speed} m/s</p>
      </div>
      }
    </div>
  );
};

const FilterCountries = ({ value, onChange }) => {
  return (
    <form>
      <div>
        find countries <input value={value} onChange={onChange} />
      </div>
    </form>
  );
};

export default App;
