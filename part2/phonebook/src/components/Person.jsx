const Persons = ({ persons, onDeleteClick }) => (
  <ul>
    {persons.map((person) => (
      <li key={person.id}>
        {person.name} {person.number}
        <button onClick={() => onDeleteClick(person.id)}>delete</button>
      </li>
    ))}
  </ul>
);

export default Persons;
