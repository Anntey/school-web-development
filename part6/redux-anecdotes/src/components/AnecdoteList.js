import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter !== undefined) {
      return anecdotes.filter(a => a.content.includes(filter))
    }
    return anecdotes
  })

  const addVote = (id) => {
    const targetAnecdote = anecdotes.find(a => a.id === id)
    const votedAnecdote = {
      ...targetAnecdote,
      votes: targetAnecdote.votes + 1
    }
    dispatch(voteAnecdote(id, votedAnecdote))
    dispatch(setNotification(`Voted "${votedAnecdote.content}"`, 4))
  }

  return(
    <div>
    <h2>Anecdotes</h2>
    {anecdotes.sort((first, sec) => sec.votes - first.votes).map(a =>
      <div key={a.id}>
        <div>
          <i>{a.content}</i>
        </div>
        <div>
          has {a.votes}
          <button onClick={() => addVote(a.id)}>vote</button>
        </div>
      </div>
    )}
    </div>
  )
}

export default AnecdoteList