import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
  
  const [ countries, setCountries ] = useState([])
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      setCountries(response.data)
    })
  },[])

  const handleFilter = (event) => setFilter(event.target.value)

  const onClickHandler = (event) => setFilter(event.target.value)

  return (
    <div>
      <Filter 
        handleFilter={handleFilter} 
        value={filter} 
      />
      <br />
      <Countries
        countries={countries}
        filter={filter}
        onClickHandler={onClickHandler}
      />
    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('root'))
