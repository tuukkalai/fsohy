require('dotenv').config()
const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')

mongoose.set('useFindAndModify', false)

console.log('Connecting to', process.env.MONGODB_URI)

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to', process.env.MONGODB_URI)
  })
  .catch((e) => {
    console.log('Error connecting to DB', e.message)
  })

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]
    allAuthors: [Author!]!
    me: User
  }

  type Mutation{
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String]
    ): Book

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if(!args.author && !args.genre){
        return await Book.find({}).populate('author')
      }
      if(args.author){
        let author = await Author.findOne({ name: args.author })
        return await Book.find({ author }).populate('author')
      }
      if(args.genre){
        return await Book.find({ genres: args.genre }).populate('author')
      }
    },
    allAuthors: async () => await Author.find({})
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author})
      if ( !author ) {
        author = new Author({ name: args.author })
        try {
          await author.save()
        } catch (e) {
          throw new UserInputError('Error while adding author', {
            invalidArgs: args
          })
        }
      }
      const book = new Book({ ...args, author: author.id })
      try{
        await book.save()
      } catch (e) {
        throw new UserInputError('Error while adding book', {
          invalidArgs: args
        })
      }
      const newBook = await Book.findById(book.id).populate('author')
      return newBook
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      if(!author){
        return null
      }
      try {
         await Author.updateOne({ _id: author.id }, { born: args.setBornTo })
         return await Author.findById(author.id)
      } catch (e) {
        throw new UserInputError('Error while updating author', {
          invalidArgs: args
        })
      }
    }
  },
  Author: {
    bookCount: async (root) => {
      const author = await Author.findOne({ name: root.name })
      return await Book.countDocuments({ author: author.id })
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})