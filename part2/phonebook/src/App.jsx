import { useState, useEffect } from 'react';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import Persons from './components/Person';
import axios from 'axios';
import personService from './services/personService';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterNames, setFilterNames] = useState('');

  // const hook = () => {
  //   axios.get('http://localhost:3001/persons')
  //     .then((response) => {
  //       setPersons(response.data)
  //     })
  // }

  const hook = () => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  };

  useEffect(hook, []);

  const addPerson = (event) => {
    event.preventDefault();

    const isInvalid = persons.some((person) => person.name === newName);
    if (isInvalid) return alert(`${newName} is already added to phonebook`);

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    personService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName('');
      setNewNumber('');
    });
  };

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filterNames.toLowerCase())
  );

  const handleFilter = (event) => setFilterNames(event.target.value);
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
