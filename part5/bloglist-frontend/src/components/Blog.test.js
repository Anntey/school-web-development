import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog /> tests', () => {
  let component
  let mockHandlerLike
  let mockHandlerRm

  beforeEach(() => {
    mockHandlerLike = jest.fn()
    mockHandlerRm = jest.fn()

    const testBlog = {
      title: 'Testataan react-frontendia',
      author: 'Testi Testinen',
      url: 'http://www.testit.com',
      likes: 0,
      user: 'asdgfuin934tna34'
    }

    component = render(
      <Blog blog={testBlog} likeCall={mockHandlerLike} removeCall={mockHandlerRm}/>
    )

  })

  // 5.13
  test('only title and author are rendered by default', () => {
    const title = component.getByText('Testataan react-frontendia')
    expect(title).toBeDefined()

    const author = component.getByText('Testi Testinen')
    expect(author).toBeDefined()

    const detailsToggleDiv = component.container.querySelector('.detailsToggleDiv')
    expect(detailsToggleDiv).toHaveStyle('display: none')
  })

  // 5.14
  test('url and likes are rendered after detailsToggleDiv is clicked', () => {
    const detailsToggleDiv = component.container.querySelector('.detailsToggleDiv')

    fireEvent.click(detailsToggleDiv)

    expect(component.container).toHaveTextContent('http://www.testit.com')
  })

  // 5.15
  test('like event is called 2 times when like is clicked 2 times', () => {
    const button = component.getByText('like')

    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandlerLike.mock.calls).toHaveLength(2)
  })
})