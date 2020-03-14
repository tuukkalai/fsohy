import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  switch (action.type){
    case 'INIT_BLOGS':
      return action.data
    case 'CREATE':
      return [...state, action.data]
    case 'LIKE':
      return state.map(b => b.id !== action.data.id ? b : action.data)
    case 'DELETE':
      return state.filter(b => b.id !== action.data.id)
    default:
      return state
  }

}

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createBlogs = (data) => {
  return {
    type: 'CREATE',
    data
  }
}

export const likeBlog = (data) => {
  return {
    type: 'LIKE',
    data
  }
}

export const deleteBlog = (data) => {
  return {
    type: 'DELETE',
    data
  }
}

export default reducer