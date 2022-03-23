const mongoose = require('mongoose');
const { titleCase } = require('../utils');

// 1. Use mongoose to establish a connection to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    console.log(`Connected to MongoDB! Database: ${process.env.DB_NAME}`)
  )
  .catch((err) => {
    console.log('Error while connecting to MongoDB');
    console.error(err);
  });

// 2. Set up any schema and models needed by the app
const glossarySchema = new mongoose.Schema({
  word: String,
  definition: String,
});

// NOTE: Methods can be added directly to the schema, before creating the model

const Glossary = mongoose.model('Glossary', glossarySchema);

const getGlossaryEntries = function () {
  return Glossary.find({}).sort({ word: 'asc' }).exec();
};

const saveEntry = function (entry) {
  const word = titleCase(entry.word);
  const definition = titleCase(entry.definition);

  return Glossary.findOneAndUpdate(
    { word: entry.word }, // filter
    { word, definition }, // object to insert
    { upsert: true } // option flags
  ).exec();
};

// 3. Export the models
// 4. Import the models into any modules that need them
module.exports = { getGlossaryEntries, saveEntry };
