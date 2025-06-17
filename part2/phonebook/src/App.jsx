import { useState, useEffect } from 'react';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import Persons from './components/Person';
import personService from './services/personService';
import './index.css';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterNames, setFilterNames] = useState('');
  const [notification, setNotification] = useState({
    message: null,
    type: null,
  });

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

  const clearNotification = () => {
    setNotification({ message: null, type: null });
  };

  const showNotification = (message, type) => {
    setNotification({ message: message, type: type });
    setTimeout(clearNotification, 3000);
  };

  const addPerson = (event) => {
    event.preventDefault();

    const alreadyExist = persons.some((person) => person.name === newName);
    if (alreadyExist) {
      updateNumber();
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
      id: (persons.length + 1).toString(),
    };

    personService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName('');
      setNewNumber('');
      showNotification(`added ${newName}`, 'success');
    });
  };

  const updateNumber = () => {
    if (
      window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )
    ) {
      const person = persons.find((p) => p.name === newName);
      const updatedPerson = { ...person, number: newNumber };

      personService
        .update(person.id, updatedPerson)
        .then((response) => {
          console.log(response);
          setPersons(
            persons.map((p) => (p.id === person.id ? updatedPerson : p))
          );
          showNotification(`updated number of ${newName}`, 'success');
        })
        .catch((error) => {
          console.error('Error updating number: ', error);
          const allPersons = personService.getAll();
          setPersons(allPersons);
        });

      return 1;
    }
  };

  const removePerson = (id) => {
    const person = persons.find(p => p.id === id)
    if (!person) return;

    if (window.confirm('Delete this person?')) {
      personService
        .deletion(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) =>
          showNotification(
            `Information of ${person.name} has already been removed from server`,
            'error'
          )
        );
    }
  };

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filterNames.toLowerCase())
  );

  const handleFilter = (event) => setFilterNames(event.target.value);
  const handleNewName = (event) => setNewName(event.target.value);
  const handleNewNumber = (event) => setNewNumber(event.target.value);
  const handleDelete = (id) => {
    removePerson(id);
  };

  return (
    <div>
      <Notification message={notification.message} type={notification.type} />
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

      <Persons persons={personsToShow} onDeleteClick={handleDelete} />
    </div>
  );
};
export default App;
