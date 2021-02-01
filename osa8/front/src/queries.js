import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors{
      id
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks{
      id
      title
      author {
        name
      }
      published
      genres
    }
  }
`

export const BOOKS_BY_GENRE = gql`
  query getAllBooksPerGenre($genre: String!) {
    allBooks(genre: $genre){
      id
      title
      published
      author {
        name
      }
    }
  }
`

export const CURRENT_USER = gql`
  query {
    me {
      username,
      favoriteGenre
    }
  }
`

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $year: Int!, $genres: [String!]!){
    addBook (
      title: $title
      author: $author
      published: $year
      genres: $genres
    ) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation setBorn($name: String!, $born: Int!){
    editAuthor(
      name: $name
      setBornTo: $born
    ) {
      name
      born
      id
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!){
    login(
      username: $username,
      password: $password
    ) {
      value
    }
  }
`