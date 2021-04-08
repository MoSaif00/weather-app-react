import React from 'react';
import DeleteButton from './DeleteButton';
import './css/CityDisplayBlock.css';
import {Link} from 'react-router-dom';

function CityDetails({handleDelete, weather, kelvinToCelsius}) {
  return (
    <div className="weather_container">
      <Link to={`/${weather.id}`} className="router_link">
        <>
          <h1 className="city_name">
            {weather.name},
            <span className="country_name">{weather.sys.country} </span>
          </h1>
          <h2 className="weather_main">
            {weather.weather[0].main}
            <span className="weather_description">
              {weather.weather[0].description}
            </span>
          </h2>
          <h4 className="max_temperature">
            Max temp : {kelvinToCelsius(weather.main.temp_max)}
          </h4>
          <h4 className="min_temperature">
            Min temp : {kelvinToCelsius(weather.main.temp_min)}
          </h4>
          <h4 className="location">
            Location : {weather.coord.lon} , {weather.coord.lat}
          </h4>
        </>
      </Link>
      <DeleteButton handleDeleteOnClick={handleDelete} />
    </div>
  );
}

export default CityDetails;
