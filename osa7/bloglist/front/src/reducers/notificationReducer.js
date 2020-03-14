const reducer = (state = [], action) => {
  switch(action.type){
    case 'SET_NOTIFICATION':
      return action.data
    case 'ZERO_NOTIFICATION':
      return []
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

export const zeroNotification = () => {
  return {
    type: 'ZERO_NOTIFICATION'
  }
}

export default reducer