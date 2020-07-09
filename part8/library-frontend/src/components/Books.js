import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [genre, setGenre] = useState('')
  const result = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  if (result.loading)  {
    return <div>loading...</div>
  }

  const genresList = () => {
    return result.data.allBooks.reduce((acc, current) => {
      current.genres.forEach(genre => {
        if (!acc.includes(genre)) {
          acc.push(genre)
        }
      })
      return acc
    }, [])
  }

  const filteredBooks = () => {
    if (genre === '') {
      return result.data.allBooks
    }
    return result.data.allBooks.filter(b => b.genres.includes(genre))
  }

  return (
    <div>
      <h2>Books</h2>

      <div>
        {genresList().map(g => <button key={g} onClick={() => setGenre(g)}>{g}</button>)}
        <button onClick={() => setGenre('')}>all genres</button>
      </div>

      <table>
        <tbody>
          <tr>
            <th style={{textAlign:'left'}}>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {filteredBooks().map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      
    </div>
  )
}

export default Books