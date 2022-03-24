require('dotenv').config();
const express = require('express');
const path = require('path');
const db = require('./db');

const app = express();

// Serves up all static and generated assets in ../client/dist.
app.use(express.static(path.join(__dirname, '../client/dist')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// route GET request to root
app.get('/glossary', (req, res) => {
  console.log('Serving GET to /glossary');

  const query = req.query.q;

  db.getGlossaryEntries(query)
    .then((entries) => res.status(200).send(entries))
    .catch((err) => {
      console.log('Error while reading from the database');
      console.error(err);
    });
});

// route POST request to /glossary
app.post('/glossary', (req, res) => {
  console.log('Serving POST to /glossary');

  const newEntry = req.body;

  if (!newEntry || !newEntry.word || !newEntry.definition) {
    return res
      .status(400)
      .send(
        new Error('Malformed request syntax. Word and Definition are required.')
      );
  }

  db.saveEntry(newEntry)
    .then(() => db.getGlossaryEntries())
    .then((entries) => res.status(201).send(entries))
    .catch((err) => {
      console.log('Error while writing to the database');
      console.error(err);
    });
});

// route POST request to /update
app.post('/update', (req, res) => {
  console.log('Serving POST to /update');

  const entry = req.body;

  if (!entry || !entry.word || !entry.definition) {
    return res.status(400).send({
      error: 'Malformed request syntax. Word and Definition are required.',
    });
  }

  db.updateEntry(entry)
    .then(() => db.getGlossaryEntries())
    .then((entries) => res.status(201).send(entries))
    .catch((err) => {
      console.log('Error while updating the database');
      console.error(err);
    });
});

// endpoint to initialize the database
app.get('/reset', (req, res) => {
  db.initialize()
    .then(() => db.getGlossaryEntries())
    .then(() => res.status(200).redirect('/'))
    .catch((err) => {
      console.log('Error while resetting the database');
      console.error(err);
    });
});

// route DELETE request to /glossary
app.delete('/glossary', (req, res) => {
  console.log('Serving DELETE to /glossary');

  db.deleteEntry(req.body._id)
    .then(() => db.getGlossaryEntries())
    .then((entries) => res.status(200).send(entries))
    .catch((err) => {
      console.log('Error while deleting from the database');
      console.error(err);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log(`Listening at http://localhost:${PORT}`);
