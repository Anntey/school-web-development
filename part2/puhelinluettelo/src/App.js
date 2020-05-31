import React, { useState, useEffect } from 'react'
import entryService from './services/entries' 

const Line = ( {name, number, id, deleteCall} ) => (
  <li>{name} {number} <button onClick={() => {deleteCall(id)}}>delete</button></li>
)

const Phonebook = ( {list, deleteCall} ) => {
  return(
    <ul>
      {list.map((entry, i) =>
        <Line
          name={entry.name}
          number={entry.number}
          key={entry.id}
          id={entry.id}
          deleteCall={deleteCall}
        />
      )}
    </ul>
  )  
}

const EntryForm = ( {name, number, entryHandler, nameHandler, numberHandler} ) => (
  <form onSubmit={entryHandler}>
    <div>
      name: <input value={name} onChange={nameHandler} />
    </div>
    <div>
      number: <input value={number} onChange={numberHandler} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>  
)

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setnewName ] = useState('')
  const [ newNumber, setnewNumber ] = useState('')

  const handleNameChange = (event) => setnewName(event.target.value)
  const handleNumberChange = (event) => setnewNumber(event.target.value)

  useEffect(() => {
      entryService
        .getAll()
        .then(initialPersons => {
          setPersons(initialPersons.data)
        })
  })  

  const addEntry = (event) => {
    event.preventDefault()
    const entryObject = {
      name: newName,
      number: newNumber
    }

    if (persons.find(person => person.name === newName) === undefined) {
      entryService
        .create(entryObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson.data))
          setnewName('')
          setnewNumber('')
        })
    } else {
      window.alert(`${entryObject.name} is already added to phonebook`)
    }
  }

  const deleteEntry = (id) => {
    let person = persons.find(person => person.id === id)
    //console.log(`id: ${id} person: ${person}`)
    if (window.confirm(`Poistetaanko ${person.name}?`)) {
      entryService
        .deletePerson(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <EntryForm
        name={newName}
        number={newNumber}
        entryHandler={addEntry}
        nameHandler={handleNameChange}
        numberHandler={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Phonebook list={persons} deleteCall={deleteEntry} />
    </div>
  )
}

export default App
