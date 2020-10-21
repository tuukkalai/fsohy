import React, { useState } from 'react'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'
import { useMutation } from '@apollo/client'

const EditAuthor = ({ authors }) => {
  const [ name, setName ] = useState('')
  const [ born, setBorn ] = useState('')

  const [ updateAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: ALL_AUTHORS
  })

  const handleBorn = (event) => {
    setBorn(parseInt(event.target.value))
  }

  const editAuthor = async (event) => {
    event.preventDefault()
    updateAuthor({ variables: { name, born }})
    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>
        Set birthyear
      </h2>
      <form onSubmit={editAuthor}>
        <div>
          name:
          <select name='name' onChange={({target}) => setName(target.value)}>
            <option defaultValue disabled>Select author</option>
            {authors.map(n => <option key={n.name} value={n.name}>{n.name}</option>)}
          </select>
        </div>
        <div>
          born:
          <input 
            type='text'
            value={born}
            onChange={handleBorn}
          />
        </div>
        <button type='submit'>Update</button>
      </form>
    </div>
  )
}

const Authors = ({ authors, token}) => {
  return(
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th>
              Name
            </th>
            <th>
              Born
            </th>
            <th>
              Books
            </th>
          </tr>
          {authors
            .map(a => 
              <tr key={a.id}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            )
          }
        </tbody>
      </table>
      { token &&
        <EditAuthor authors={authors} />
      }
    </div>
  )
}

export default Authors