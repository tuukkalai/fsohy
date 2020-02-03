import React from 'react'

const Filter = ({handleFilter, filter}) => {
  return (
    <div>
      filter: <input onChange={handleFilter} value={filter} />
    </div>
  )
}

export default Filter