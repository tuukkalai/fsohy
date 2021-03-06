import React from 'react'

const Persons = ({persons, filter, handleDelete}) => {
  return (
    <table>
      <tbody>
        {persons
          .filter(p => p.name
            .toLowerCase()
            .includes(filter
              .toLowerCase()))
            .map(p => <tr key={p.name}>
                        <td>{p.name}</td>
                        <td>{p.number}</td>
                        <td><button onClick={() => handleDelete(p)}>delete</button></td>
                      </tr>)}
      </tbody>
    </table>
  )
}

export default Persons