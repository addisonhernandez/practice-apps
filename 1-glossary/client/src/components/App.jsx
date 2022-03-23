import React from 'react';
import Search from './Search.jsx';
import NewWordForm from './NewWordForm.jsx';
import WordList from './WordList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { entries: [] };
  }

  getEntries() {
    // TODO: Refactor into a single handleRequest method

    fetch('/glossary', {
      method: 'GET', // Note to future self: this is the default
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        if (!response.ok) {
          // TODO: figure out how to really pass on the error
          throw response.json();
        }
        return response.json();
      })
      .then((entries) => {
        if (entries && entries.length) {
          this.setState({ entries });
        }
      })
      .catch((err) => {
        console.log('Problem getting entries from server');
        console.error(err);
      });
  }

  addNewWord(newEntry) {
    // TODO: Refactor into a single handleRequest method

    fetch('/glossary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEntry),
    })
      .then((response) => {
        if (!response.ok) {
          // TODO: figure out how to really pass on the error
          throw response.json();
        }
        return response.json();
      })
      .then((entries) => {
        if (entries && entries.length) {
          this.setState({ entries });
        }
      })
      .catch((err) => {
        console.log('Problem adding entry to server');
        console.error(err);
      });
  }

  componentDidMount() {
    this.getEntries();
  }

  render() {
    return (
      <>
        <h1>Glossary</h1>
        <Search onSearch={this.getEntries.bind(this)} />
        <NewWordForm onSubmit={this.addNewWord.bind(this)} />
        <WordList entries={this.state.entries} />
      </>
    );
  }
}

export default App;
