import { useEffect, useState } from "react";
import services from "../../services.js";



const baseUrl = "http://localhost:3001/persons";

const Phonebook = () => {
  const [persons, setPersons] = useState([]);
  const [newFilterValue, setFilterValue] = useState("");
  const [newEntry, setNewEntry] = useState({ name: "", number: "" });
  const [newMsg, setNewMsg] = useState({ color: "", msg: "" });

  useEffect(() => {
    console.log("effect");
    services
      .getAll(baseUrl)
      .then((returnedPersons) => {
        setPersons(returnedPersons.data);
        //console.log(persons)
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  }, []);

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}`)) {
      services
        .remove(person.id, baseUrl)
        .then(() => {
          setPersons(persons.filter((value) => value.id !== person.id));
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  };

  const handleFilterInputChange = (event) => {
    setFilterValue(event.target.value);
  };

  const handleInputChange = (event) => {
    const { value, name } = event.target;

    const entry = {
      ...newEntry,
      [name]: value,
    };

    setNewEntry(entry);
    console.log(entry);
  };

  const updatePerson = () => {
    if (
      window.confirm(
        `${newEntry.name} is already added to phonebook, replace the old number with a new one?`
      )
    ) {
      const personToUpdate = findPerson(newEntry);
      if (!personToUpdate) {
        console.log("Person not found");
        return;
      }
      console.log(personToUpdate, personToUpdate.id);

      services
        .update(personToUpdate.id, newEntry, baseUrl)
        .then(() => {
          console.log("sucess");
        })
        .catch((error) => {
          console.log("error", error);
          setNewMsg({
            msg: `Information of ${newEntry.name} has already been removed from server`,
            color: "red",
          });
          setTimeout(() => {
            setNewMsg({ msg: "", color: "" });
            window.location.reload();
          }, 10440000);
        });
    }
  };

  const createPerson = () => {
    services
      .create(newEntry, baseUrl)
      .then((response) => {
        const newPersons = persons.concat(response.data);

        setPersons(newPersons);

        console.log(newPersons);
      })
      .catch((error) => {
        console.log("errorrrrrrrrrr", error.response.data.error);

        const errorMessage = error.response?.data?.error || error.message || 'An error occurred';
        setNewMsg({
          msg: errorMessage,
          color: "red",
        });
        setTimeout(() => {
          setNewMsg({ msg: "", color: "" });
        }, 90000);
        
      });

    setNewEntry({ name: "", number: "" });
  };

  const submitPerson = (event) => {
    event.preventDefault();
    console.log(verifyPerson());
    console.log("New Entry", newEntry);

    if (verifyPerson()) {
      updatePerson();
      setNewMsg({ msg: `Updated ${newEntry.name}`, color: "green" });
      setTimeout(() => {
        setNewMsg({ color: "", msg: "" });
        window.location.reload();
      }, 3000);
    } else {
      createPerson();
      setNewMsg({ msg: `Added ${newEntry.name}`, color: "green" });
      setTimeout(() => setNewMsg({ color: "", msg: "" }), 3000);
    }
  };

  const verifyPerson = () =>
    persons.some((person) => person.name === newEntry.name);

  const findPerson = (person) => {
    return persons.find(
      (value) => person.name === value.name || person.number === value.number
    );
  };

  const filterPersons = () =>
    persons.filter((person) => person.name.includes(newFilterValue));

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={newFilterValue} onChange={handleFilterInputChange} />

      <h3>add a new</h3>

      <PersonForm
        newEntry={newEntry}
        onSubmit={submitPerson}
        onChange={handleInputChange}
      />

      {newMsg.msg && (
        <NotificationMsg message={newMsg.msg} color={newMsg.color} />
      )}

      <h2>Numbers</h2>

      <Persons persons={filterPersons()} onDelete={deletePerson} />
    </div>
  );
};

const NotificationMsg = ({ message, color }) => (
  <h4
    style={{
      color: `${color}`,
      background: "lightgrey",
      fontSize: "20px",
      borderStyle: "solid",
      borderRadius: "5px",
      padding: "10px",
      marginBottom: "10px",
    }}
  >
    {message}
  </h4>
);

const Person = ({ person, onDelete }) => (
  <li>
    {person.name} {person.number}
    <button onClick={() => onDelete(person)}>delete</button>
  </li>
);

const Filter = ({ value, onChange }) => {
  return (
    <form>
      <div>
        filter shown with <input value={value} onChange={onChange} />
      </div>
    </form>
  );
};

const PersonForm = ({ newEntry, onSubmit, onChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input name="name" value={newEntry.name} onChange={onChange} />
      </div>
      <div>
        number:{" "}
        <input
          name="number"
          value={newEntry.number}
          onChange={onChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ persons, onDelete }) => {
  return (
    <ul>
      {persons.map((person) => (
        <Person key={person.id} person={person} onDelete={onDelete} />
      ))}
    </ul>
  );
};

export default Phonebook;
