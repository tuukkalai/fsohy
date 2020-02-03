import React from 'react'
import SingleCountry from './SingleCountry'

const Countries = ({ countries, filter, onClickHandler }) => {
  
  const filteredCountries = countries
    .filter(c => c.name.toLowerCase().includes(filter.toLowerCase()))
  
  if(filteredCountries.length > 290){
    return 'Too many matches, specify another filter'
  }else if(filteredCountries.length === 1){
    return <SingleCountry country={filteredCountries[0]} />
  }else{
    return (
      <ul>
        {filteredCountries.map(c => <li key={c.alpha2Code}>{c.name} <button onClick={onClickHandler} value={c.name}>show</button></li>)}
      </ul>
    )
  }
}

export default Countries