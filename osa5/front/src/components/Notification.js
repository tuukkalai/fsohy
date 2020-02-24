import React from 'react'
import styled from 'styled-components'

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

const Notification = ({ message }) => {
  if(message[0].length === 0){
    return <></>
  }else{
    return(
      <Notif error={message[1] ? 'error' : ''}>
        <Text>{message[0]}</Text>
      </Notif>
    )
  }
}

export default Notification