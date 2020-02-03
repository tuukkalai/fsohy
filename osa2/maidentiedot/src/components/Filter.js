import React from 'react'

const Filter = ({handleFilter, filter}) => {
  return <input onChange={handleFilter} value={filter} />
}

export default Filter