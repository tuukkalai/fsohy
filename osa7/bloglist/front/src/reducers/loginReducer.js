const reducer = (state = null, action) => {
  switch(action.type){
    case 'LOGIN':
      return action.data
    case 'LOGOUT':
      return action.data
    default:
      return state
  }
}

export const login = (data) => {
  return {
    type: 'LOGIN',
    data
  }
}

export const logout = () => {
  return {
    type: 'LOGOUT',
    data: null
  }
}

export default reducer