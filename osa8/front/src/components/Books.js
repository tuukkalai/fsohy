import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { BOOKS_BY_GENRE } from '../queries'

const Books = ({ books }) => {
  const [getBooks, result] = useLazyQuery(BOOKS_BY_GENRE)
  const [booksToShow, setBooksToShow] = useState(books)
  
  let indGenres = []
  books.map(b => (
    b.genres.map(g => (
      indGenres.indexOf(g) === -1 && indGenres.push(g)
    ))
  ))

  const showGenre = (genre) => {
    getBooks({ variables: { genre }})
  }
  
  useEffect(() => {
    if(result.data){
      setBooksToShow(result.data.allBooks)
    }
  }, [result])

  return(
    <div>
      <h2>Books</h2>
      <table>
        <thead>
          <tr>
            <th>
              Title
            </th>
            <th>
              Author
            </th>
            <th>
              Published
            </th>
          </tr>
        </thead>
        <tbody>
          {booksToShow
            .map(b => 
              <tr key={b.id}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
              </tr>
            )
          }
        </tbody>
      </table>
      {indGenres.map(g => 
        <div key={g}>
          <input type="radio" name="genre" id={ g } onChange={ () => showGenre(g) } />
          <label htmlFor={ g }>{ g }</label>
        </div>        
      )}
    </div>
  )
}

export default Books