import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)

  if (authors.loading || books.loading) {
    return <div>loading...</div>
  }

  const pageToShow = () => {
    if(page === 'authors'){
      return <Authors authors={authors.data.allAuthors} />
    } else {
      return <Books books={books.data.allBooks} />
    }      
  }
  return (
    <div>
      <button onClick={() => setPage('authors')}>Authors</button>
      <button onClick={() => setPage('books')}>Books</button>
      { pageToShow() }
    </div>
  )
}

export default App
