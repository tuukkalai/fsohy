import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

const Notif = styled.div`
  position: absolute;
  bottom: 10px;
  right:10px;
  margin: 10px 0;
  padding: 1px 10px;
  background-color: ${props => props.error ? '#ee4466' : '#222'};
  color: #fff;
  border: 3px solid ${props => props.error ? '#ff1122' : '#666'};
  border-radius: 6px;
`

const Text = styled.p`
  font-size: 1rem;
  line-height: 1.2;
`

const Notification = () => {
  const notification = useSelector(state => state.notification)
  if(notification[0] === '' || notification[0] === undefined){
    return <></>
  }else{
    return(
      <Notif error={notification[1] ? 'error' : ''}>
        <Text>{notification[0]}</Text>
      </Notif>
    )
  }
}

export default Notification