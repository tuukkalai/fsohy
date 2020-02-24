import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    id: 'TestiID12003102301',
    title: 'Nyt pitäis sulkeutua',
    author: 'tuukka',
    url: 'testi'
  }

  const component = render(
    <Blog key={blog.id} blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Nyt pitäis sulkeutua'
  )

  expect(component.container).toHaveTextContent(
    'tuukka'
  )

  expect(component.container).not.toHaveTextContent(
    'testi'
  )
})