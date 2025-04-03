const personsRouter = require("express").Router();
const Person = require("../models/person");

personsRouter.get("/", (request, response) => {
  Person.find({})
    .then((persons) => {
      console.log("Persons from the database:", persons);
      response.json(persons);
    })
    .catch((error) => {
      console.error("Error retrieving persons:", error);
      response.status(500).json({ error: "Failed to retrieve persons" });
    });
});

personsRouter.get("/info", (request, response) => {
  Person.find({}).then((persons) => {
    const timeNow = new Date();
    const text = `<p>Phonebook has info for ${
      persons.length
    } people<p><p>${timeNow.toString()}<p>`;
    response.send(text);
  });
});

personsRouter.get("/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

personsRouter.delete("/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

personsRouter.post("/", (request, response, next) => {
  const id = Math.floor(Math.random() * (999999 - 1 + 1)) + 1;

  let body = request.body;
  body.id = id;

  Person.findOne({ name: body.name }).then((person) => {
    if (person) {
      return response.status(400).json({ error: "name must be unique" });
    } else if (person.name === undefined || person.number === undefined) {
      return response.status(400).json({ error: "content mising" });
    }
  });

  const person = new Person({
    name: body.name,
    number: body.number,
    id: body.id,
  });

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => next(error));
});

personsRouter.put('/:id', (request, response, next) => {
  const { name, number, id } = request.body;

  Person.findByIdAndUpdate(
    request.params.id,
    { name, number, id },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

module.exports = personsRouter
