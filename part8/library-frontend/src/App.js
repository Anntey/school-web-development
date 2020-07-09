import React, { useState, useEffect } from 'react'
import { useApolloClient, useMutation, useQuery, useSubscription } from '@apollo/client'
import { ALL_BOOKS, ALL_AUTHORS, LOGIN, ME, BOOK_ADDED } from './queries'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`Added "${addedBook.title}" by ${addedBook.author.name}`)
    }
  })


  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  const [login, result] = useMutation(LOGIN, {
    refetchQueries: [ { query: ALL_AUTHORS }, { query: ALL_BOOKS } ]
  })

  const loggedUser = useQuery(ME)

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
      setPage('authors')
    }
  }, [result.data])


  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>Authors</button>
        <button onClick={() => setPage('books')}>Books</button>
        {!token
          ? <>
            <button onClick={() => setPage('login')}>Login</button>
            </>
          : <>
            <button onClick={() => setPage('add')}>Add book</button>
            <button onClick={() => setPage('recommend')}>Recommendations</button>
            <button onClick={logout}>Logout</button>
            </>
        }
        
      </div>

      <Authors
        show={page === 'authors'}
        token={token}
      />
      <Books
        show={page === 'books'}
      />
      <NewBook
        show={page === 'add'}
      />
      <LoginForm
        show={page === 'login'}
        login={login}
        setToken={() => setToken(token)}
      />
      <Recommendations
        show={page === 'recommend'}
        user={loggedUser}
      />

    </div>
  )
}

export default App