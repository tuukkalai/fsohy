import React from 'react'

const PersonForm = ({handleSubmit, handleName, handleNumber, name, number}) => {
  return (
    <form onSubmit={handleSubmit}>
      <table>
        <tbody>
          <tr>
            <td>Name:</td>
            <td><input value={name} onChange={handleName} /></td>
          </tr>
          <tr>
            <td>Number:</td>
            <td><input value={number} onChange={handleNumber} /></td>
          </tr>
        </tbody>
      </table>
      <button type="submit">add</button>
    </form>
  )
}

export default PersonForm