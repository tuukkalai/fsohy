import React, { useState } from 'react'
import { useQuery, useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import BookForm from './components/BookForm'
import LoginForm from './components/LoginForm'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [error, setError] = useState(null)
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const client = useApolloClient()

  if (authors.loading || books.loading) {
    return <div>loading...</div>
  }

  const notify = (message) => {
    setError(message)
    setTimeout(() => {
      setError(null)
    },5000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    // client.cache.reset()
  }

  const pageToShow = () => {
    if(page === 'authors'){
      return <Authors authors={authors.data.allAuthors} token={token} />
    } else if(page === 'books') {
      return <Books books={books.data.allBooks} />
    } else if (page === 'loginForm') {
      return <LoginForm setToken={setToken} setError={notify} />
    } else {
      return <BookForm />
    }
  }

  return (
    <>
      <header>
        <div>
          { error }
        </div>
        <nav>
          <ul>
            <li><button onClick={() => setPage('authors')}>Authors</button></li>
            <li><button onClick={() => setPage('books')}>Books</button></li>
          { token &&
            <>
              <li><button onClick={() => setPage('bookForm')}>Add book</button></li>
              <li><button onClick={ logout }>Logout</button></li>
            </>
          }
          { !token &&
            <li><button onClick={() => setPage('loginForm')}>Login</button></li>
          }
          </ul>
        </nav>
      </header>
      <main>
        { pageToShow() }
      </main>
    </>
  )
}

export default App
