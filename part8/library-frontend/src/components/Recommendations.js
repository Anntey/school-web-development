import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'


const Recommendations = (props) => {
  const result = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  if (result.loading)  {
    return <div>loading...</div>
  }

  const favGenre = props.user.data.me.favoriteGenre
  const books = result.data.allBooks
  const recommends = books.filter(b => b.genres.includes(favGenre))

  return (
    <div>
      <h2>Recommendations</h2>

      <div>Books in your favorite genre {favGenre}</div>
      
      <table>
        <tbody>
          <tr>
            <th style={{textAlign:'left'}}>Name</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {recommends.map(a =>
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

export default Recommendations 