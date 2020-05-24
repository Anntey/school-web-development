import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Line = ( {name, number} ) => (
  <li>{name} {number}</li>
)

const Phonebook = ( {list} ) => {
  return(
    <ul>
      {list.map((entry, i) =>
        <Line name={entry.name} number={entry.number} key={i} />
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
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])  

  const addEntry = (event) => {
    event.preventDefault()
    const entryObject = {
      name: newName,
      number: newNumber
    }
    
    if (persons.find(entry => entry.name === newName) === undefined) {
      axios
      .post('http://localhost:3001/persons', entryObject)
      .then(response => {
        console.log('promise fulfilled')
        setPersons(persons.concat(entryObject))
        setnewName('')
        setnewNumber('')
      })
    } else {
      window.alert(`${entryObject.name} is already added to phonebook`)
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
      <Phonebook list={persons} />
    </div>
  )
}

export default App
