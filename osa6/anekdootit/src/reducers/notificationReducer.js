const reducer = (state = '', action) => {
  //console.log('state now: ', state)
  //console.log('action', action)
  switch(action.type){
    case 'SET_NOTIFICATION':
      return action.data
    default:
      return state
  }
}

export const setNotification = (notification) => {
  return {
    type: 'SET_NOTIFICATION',
    data: notification
  }
}

export default reducer