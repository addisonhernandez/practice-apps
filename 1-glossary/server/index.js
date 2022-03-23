require("dotenv").config();
const express = require("express");
const path = require("path");
const db = require('./db');

const app = express();

// Serves up all static and generated assets in ../client/dist.
app.use(express.static(path.join(__dirname, "../client/dist")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// route GET request to root
app.get('/', (req, res) => {
  console.log('Serving GET to /');
  db.find({}).sort({ word: 'asc' }).exec()
    .then((results) => {
      console.log(results);
      return results;
    })
    .then((entries) => res.status(200).send(entries))
    .catch((err) => {
      console.log('Error while reading from the database');
      console.error(err);
    });
});

// route POST request to /glossary
app.post('/glossary', (req, res) => {
  // TODO:
  res.status(404).end();
});

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
