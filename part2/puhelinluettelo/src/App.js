import React, { useState } from 'react'

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
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setnewName ] = useState('')
  const [ newNumber, setnewNumber ] = useState('')

  const handleNameChange = (event) => setnewName(event.target.value)
  const handleNumberChange = (event) => setnewNumber(event.target.value)

  const addEntry = (event) => {
    event.preventDefault()
    const entryObject = {
      name: newName,
      number: newNumber
    }

    if (persons.find(entry => entry.name === newName) === undefined) {
      setPersons(persons.concat(entryObject))
    } else {
      window.alert(`${entryObject.name} is already added to phonebook`)
    }
    setnewName('')
    setnewNumber('')
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
