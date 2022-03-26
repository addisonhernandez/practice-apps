import React from 'react';
import Search from './Search.jsx';
import NewWordForm from './NewWordForm.jsx';
import WordList from './WordList.jsx';
import ReactModal from 'react-modal';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      entries: [],
      showModal: false,
      entryToEdit: {},
    };
  }

  /*** Server Communication Methods ***/
  handleFetch(endpoint, options = {}) {
    options = {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    };
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

    this.handleFetch(endpoint);
  }

  upsertWord(newEntry) {
    this.handleFetch('/glossary', {
      method: 'POST',
      body: JSON.stringify(newEntry),
    });
  }

  editEntry(entryIndex) {
    this.handleOpenModal(entryIndex);
  }

  deleteEntry(entryIndex) {
    this.handleFetch('/glossary', {
      method: 'DELETE',
      body: JSON.stringify(this.state.entries[entryIndex]),
    });
  }

  /*** Modal Manipulation Methods ***/
  handleOpenModal(entryIndex) {
    const entryToEdit = this.state.entries[entryIndex];

    this.setState({ showModal: true, entryToEdit });
  }

  handleCloseModal() {
    const word = document.getElementById('new-word').value;
    const definition = document.getElementById('new-definition').value;

    if (
      (word && word !== this.state.entryToEdit.word) ||
      (definition && definition !== this.state.entryToEdit.definition)
    ) {
      this.upsertWord({ ...this.state.entryToEdit, word, definition });
    }

    this.setState({ showModal: false });
  }

  componentDidMount() {
    ReactModal.setAppElement('body');
    this.getEntries();
  }

  render() {
    return (
      <>
        <h1>Glossary</h1>
        <ReactModal
          isOpen={this.state.showModal}
          onRequestClose={this.handleCloseModal.bind(this)}
          contentLabel={'Edit Glossary Entry Modal'}
        >
          <h2>This is a modal!</h2>
          <input id="new-word" defaultValue={this.state.entryToEdit.word} />
          <input
            id="new-definition"
            defaultValue={this.state.entryToEdit.definition}
          />
          <button onClick={this.handleCloseModal.bind(this)}>
            Submit Changes
          </button>
        </ReactModal>
        <Search onSearch={this.getEntries.bind(this)} />
        <NewWordForm onSubmit={this.upsertWord.bind(this)} />
        <WordList
          entries={this.state.entries}
          onEdit={this.handleOpenModal.bind(this)}
          onDelete={this.deleteEntry.bind(this)}
        />
      </>
    );
  }
}

export default App;
