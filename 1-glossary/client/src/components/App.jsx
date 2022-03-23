import React from 'react';
import Search from './Search.jsx';
import NewWordForm from './NewWordForm.jsx';
import WordList from './WordList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { entries: [] };
  }

  filterResults(term = {}) {
    // TODO: Refactor into a single handleRequest method
    // send a GET request to server
    // payload: `term`
    // expect response: glossary entries from DB that match
    // update state

    fetch('/glossary', {
      method: 'GET', // Note to future self: this is the default
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(term),
    })
      .then((response) => response.json())
      .then((entries) => this.setState({ entries }))
      .catch((err) => {
        console.log('Problem getting entries from server');
        console.error(err);
      });
  }

  addNewWord(word, definition) {
    // TODO: Refactor into a single handleRequest method
    // POST to server
    // payload: { word, definition }
    // response: status code? all entries?
    // update state

    fetch('/glossary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ word, definition }),
    })
      .then((response) => response.json())
      .then((entries) => this.setState({ entries }))
      .catch((err) => {
        console.log('Problem adding entry to server');
        console.error(err);
      });
  }

  componentDidMount() {
    this.filterResults();
  }

  render() {
    return (
      <>
        <h1>Glossary</h1>
        <Search onSearch={this.filterResults.bind(this)} />
        <NewWordForm onSubmit={this.addNewWord.bind(this)} />
        <WordList entries={this.state.entries} />
      </>
    );
  }
}

export default App;
