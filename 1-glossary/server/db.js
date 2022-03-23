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

const initialize = function () {
  return Glossary.bulkWrite([
    {
      deleteMany: {
        filter: {},
      },
    },
    {
      insertOne: {
        document: {
          word: 'Fluff',
          definition: 'A floofy poofy animal',
        },
      },
    },
    {
      insertOne: {
        document: {
          word: 'Nugget',
          definition: 'An animal that acts helpless in a silly way',
        },
      },
    },
    {
      insertOne: {
        document: {
          word: 'Grumpp',
          definition: 'A pet in a state of pout',
        },
      },
    },
    {
      insertOne: {
        document: {
          word: 'Zoomies',
          definition: 'Pure and unbridled joy',
        },
      },
    },
  ]).then((res) => {
    console.log(`Database reset.\n${res.deletedCount} documents deleted.`);
  });
};

// 3. Export the models
// 4. Import the models into any modules that need them
module.exports = { getGlossaryEntries, saveEntry, initialize };
