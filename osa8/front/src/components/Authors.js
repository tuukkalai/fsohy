import React from 'react'

const Authors = ({ authors }) => {
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
    </div>
  )
}

export default Authors