import React from 'react';
import Search from './Search.jsx';
import NewWordForm from './NewWordForm.jsx';
import WordList from './WordList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { entries: [] };
  }

  handleFetch(endpoint, options) {
    fetch(endpoint, options)
      .then((response) => {
        if (!response.ok) {
          // TODO: figure out how to really pass on the error
          throw response.json();
        }
        return response.json();
      })
      .then((entries) => {
        if (entries) {
          this.setState({ entries });
        }
      })
      .catch((err) => {
        console.log('Problem getting entries from server');
        console.error(err);
      });
  }

  getEntries(term) {
    let endpoint = '/glossary';

    if (term) {
      endpoint += `?q=${term}`;
    }

    this.handleFetch(endpoint, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  addNewWord(newEntry) {
    this.handleFetch('/glossary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEntry),
    });
  }

  editEntry(entryIndex) {
    // TODO: something with a modal dialog
    console.log(`Editing entry number ${entryIndex}`);
    console.log(this.state.entries[entryIndex]);
  }

  deleteEntry(entryIndex) {
    this.handleFetch('/glossary', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state.entries[entryIndex]),
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
        <WordList
          entries={this.state.entries}
          onEdit={this.editEntry.bind(this)}
          onDelete={this.deleteEntry.bind(this)}
        />
      </>
    );
  }
}

export default App;
