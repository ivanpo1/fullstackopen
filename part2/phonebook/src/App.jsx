import { useState } from 'react';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter'
import Persons from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterNames, setFilterNames] = useState('');

  const addPerson = (event) => {
    event.preventDefault();

    const isInvalid = persons.some((person) => person.name === newName);
    if (isInvalid) return alert(`${newName} is already added to phonebook`);

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    setPersons(persons.concat(personObject));
    setNewName('');
    setNewNumber('');
  };

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filterNames.toLowerCase()));

  const handleFilter = (event) => setFilterNames(event.target.value)
  const handleNewName = (event) => setNewName(event.target.value);
  const handleNewNumber = (event) => setNewNumber(event.target.value);

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter OnFilterChange={handleFilter} filterNames={filterNames} />

      <h3>add a new</h3>

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        onNameChange={handleNewName}
        newNumber={newNumber}
        onNumberChange={handleNewNumber}
      />

      <h3>Numbers</h3>

      <Persons persons={personsToShow} />
    </div>
  );
};

export default App;
