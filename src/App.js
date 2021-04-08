import React, {useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // useLocation,
} from 'react-router-dom';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import CityDetails from './components/CityDisplayBlock';
import Loading from './components/LoadingMessage';
import CityChart from './components/CityChart';
import './App.css';
import './components/css/Header.css';

function App() {
  const [searchedCity, setSearchedCity] = useState('');
  const [cityWeatherData, setCityWeatherData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [hasError, setError] = useState({
    show: false,
  });

  const fetchWeatherData = async (e) => {
    setLoading(true);
    setError(false);
    const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${apiKey}`;
    try {
      if (searchedCity) {
        const res = await fetch(apiURL);
        if (res.ok) {
          const data = await res.json();
          setCityWeatherData([data, ...cityWeatherData]);
        } else {
          setError({
            show: true,
            error: `${searchedCity}'s is not a city name`,
          });
        }
      }
    } catch (err) {
      setError({
        show: true,
        error: `Oops... something went wrong with bringing ${searchedCity}'s data to you`,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const onInputChangeHandler = (e) => {
    setSearchedCity(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    fetchWeatherData();
    setSearchedCity('');
  };

  const onDeleteHandler = (deletedCityData) => {
    const newSearchCitiesList = cityWeatherData.filter(
      (city) => city !== deletedCityData
    );
    setCityWeatherData([...newSearchCitiesList]);
  };

  function kelvinToCelsius(kelvin) {
    return (kelvin - 273).toFixed(2);
  }

  return (
    <Router>
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Header />
            <SearchForm
              onSubmit={onSubmitHandler}
              onClick={fetchWeatherData}
              searchedCity={searchedCity}
              hasError={hasError}
              onInputChange={onInputChangeHandler}
            />
            <Loading isLoading={isLoading} />
            {!hasError &&
              cityWeatherData.map((weather, index) => {
                return (
                  <CityDetails
                    key={index}
                    weather={weather}
                    handleDelete={() => onDeleteHandler(weather)}
                    kelvinToCelsius={kelvinToCelsius}
                  />
                );
              })}
          </Route>

          <Route
            path="/:cityId"
            children={<CityChart kelvinToCelsius={kelvinToCelsius} />}
          ></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
