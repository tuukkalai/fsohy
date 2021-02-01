import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { BOOKS_BY_GENRE } from '../queries'

const Recommended = ({ user }) => {
  const [ getBooks, result ] = useLazyQuery(BOOKS_BY_GENRE)

  getBooks({ variables: user.data.me.favoriteGenre })

  useEffect(() => {
    if(result.data){
      console.log('result.data', result.data)
    }
  }, [result.data])

  return(
    <div>
      <h2>Recommended</h2>
      <table>
        <thead>
          <tr>
            <th>
              Title
            </th>
            <th>
              Author
            </th>
            <th>
              Published
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Insert table here : { user.data.me.username }</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Recommended