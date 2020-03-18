import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors{
      name
      born
      id
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks{
      id
      title
      author
      published
      genres
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
      author
      published
      genres
    }
  }
`