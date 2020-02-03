import React, { useState, useEffect } from 'react'
import axios from 'axios'

const iconStyle = {
  width: '100px'
}

const SingleCountry = ({ country }) => {

  const [ weather, setWeather ] = useState([])

  useEffect(() => {
    if(country !== null){
      axios.get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHER_API_KEY}&query=${country.capital}&units=m`).then(response => {
        setWeather(response.data.current)
      })
    }
  }, [country])

  return (
    <div>
      <h1>{country.name}</h1>
      <p>Capital {country.capital}<br/>
      Population {country.population}</p>
      <h2>
        Languages
      </h2>
      <ul>
        {country.languages.map(l => <li key={l.iso639_1}>{l.name}</li>)}
      </ul>
      <img src={country.flag} style={iconStyle} alt={country.name} />
      <h3>Weather in {country.capital}</h3>
      <p>Current temperature {weather.temperature}&nbsp;&deg;C (feels like {weather.feelslike}&nbsp;&deg;C)</p>
      { weather.weather_icons ? weather.weather_icons.map((u, i) => <img key={i} src={u} alt={`Weather in ${country.capital}`} style={iconStyle} />) : '' }
      <p>Wind: {weather.wind_dir} { Math.floor(weather.wind_speed/3.6) } m/s</p>
    </div>
  )
}

export default SingleCountry