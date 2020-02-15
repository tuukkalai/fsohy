// const logger = require('./logger')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  let highest = 0
  blogs.map(b => b.likes > highest ? highest = b.likes : highest += 0)
  // logger.info('highest', highest)
  return blogs.length === 0 ? 0 : blogs.find(b => b.likes === highest)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}