import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK } from '../queries'

const BookForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [year, setYear] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [
      { 
        query: ALL_AUTHORS 
      },
      { 
        query: ALL_BOOKS 
      } 
    ],
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    }
  })

  const submit = async (event) => {
    event.preventDefault()
    createBook({ variables: { title, author, year: year, genres}})
    setTitle('')
    setAuthor('')
    setYear('')
    setGenres([])
  }

  const addGenre = (event) => {
    event.preventDefault()
    const newGenres = [...genres, genre]
    setGenres(newGenres)
    setGenre('')
  }

  const handleYear = (event) => {
    setYear(parseInt(event.target.value))
  }

  return (
    <div>
      <h2>Add book</h2>
      <form onSubmit={submit}>
        <div>
          <label htmlFor='title'>Title</label> 
          <input value={title} onChange={({target}) => setTitle(target.value)} />
        </div>
        <div>
          <label htmlFor='author'>Author</label> 
          <input value={author} onChange={({target}) => setAuthor(target.value)} />
        </div>
        <div>
          <label htmlFor='published'>Published</label> 
          <input type='number' value={year} onChange={handleYear} />
        </div>
        <div>
          <label htmlFor='genres'>Genres</label> 
          <input value={genre} onChange={({target}) => setGenre(target.value)} />
        </div>
        <div>
        <button onClick={addGenre}>add genre</button>
          {genres.join(', ')}
        </div>
        <button type='submit'>Add book</button>
      </form>
    </div>

  )
}

export default BookForm