const reducer = (state = [], action) => {
  switch (action.type){
    case 'INIT_USERS':
      return action.data
    default:
      return state
  }

}

export const initUsers = (data) => {
  return {
    type: 'INIT_USERS',
    data
  }
}

export default reducer