const mongoose = require('mongoose');

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

// 3. Export the models
const Glossary = mongoose.model('Glossary', glossarySchema);

// 4. Import the models into any modules that need them
module.exports = Glossary;
