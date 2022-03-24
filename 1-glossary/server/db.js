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

const getGlossaryEntries = function (query) {
  let filter = {};

  if (query && query.length) {
    const queryRE = new RegExp(query, 'i');
    filter = { $or: [{ word: queryRE }, { definition: queryRE }] };
  }

  return Glossary.find(filter).sort({ word: 'asc' }).exec();
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

const deleteEntry = function (entryId) {
  return Glossary.deleteOne({ _id: entryId }).exec();
};

const updateEntry = function (entry) {
  entry.word = titleCase(entry.word);
  entry.definition = titleCase(entry.definition);

  return Glossary.findOneAndUpdate(
    { _id: entry._id }, // filter
    entry // object to insert
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
module.exports = {
  getGlossaryEntries,
  saveEntry,
  deleteEntry,
  updateEntry,
  initialize,
};
